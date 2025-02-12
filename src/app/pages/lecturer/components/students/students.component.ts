import { Component, inject, signal } from '@angular/core';
import { LecturerStudentsHeaderComponent } from './components/lecturer-students-header/lecturer-students-header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import {
  studentForLectureQuery,
  studentsQueryKey,
} from '../../../../shared/helpers/query-keys.helper';
import { StudentTableService } from '../../../admin/service/students-table/student-table.service';
import { IGetStudentForLecturerData } from '../../../../shared/interfaces/response.interface';
import { ModalContainerComponent } from '../../../../shared/components/modal-container/modal-container.component';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { searchArray } from '../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [
    LecturerStudentsHeaderComponent,
    TableComponent,
    NgTemplateOutlet,
    ModalContainerComponent,
    TitleCasePipe,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  providers: [MessageService],
})
export class StudentsComponent {
  studentService = inject(StudentTableService);
  messageService = inject(MessageService);

  filteredData = signal<TableData[]>([]);
  searchTerm = signal<string>('');
  currentPage = signal<number>(1);
  first = signal<number>(0);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);
  showModal = false;

  student = signal<IGetStudentForLecturerData>(
    {} as IGetStudentForLecturerData
  );

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Place of internship', key: 'placeOfInternship' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Phone', key: 'phone' },
    { label: 'Status', key: 'status' },
  ];

  studentsInternQuery = injectQuery(() => ({
    queryKey: [studentForLectureQuery],
    queryFn: async () => {
      const response = await this.studentService.getStudentsInlectureZone();

      this.totalData.set(response.data.student.totalStudents);

      return this.destructureStudents(response.data.student.students);
    },
  }));

  destructureStudents(data: IGetStudentForLecturerData[]): TableData[] {
    if (!data) return [];

    data.filter((student) => {
      if (student.isSupervised) {
        student.status = 'SUPERVISED';
      } else {
        student.status = 'NOT SUPERVISED';
      }
    });

    return data.map((student: IGetStudentForLecturerData) => ({
      student_id: student.id,
      name: student.name,
      faculty: student.faculty,
      department: student.department,
      phone: student.phone,
      status: student.status,
      placeOfInternship: student.placeOfInternship,
      isSupervised: student.isSupervised,
    }));
  }

  handleSearchTerm(value: string) {
    this.searchTerm.set(value);

    const filteredStudents = searchArray(
      this.studentsInternQuery.data()!,
      value,
      ['name', 'placeOfInternship', 'student_id']
    );

    this.filteredData.set(filteredStudents ?? []);
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);
    this.currentPage.set(data.page + 1);
    this.pageSize.set(data.rows);
  }

  openModal(data: any): void {
    this.showModal = true;
    this.student.set(data);
  }

  closeModal(): void {
    this.showModal = false;
    this.studentsInternQuery.refetch();
  }

  changeStatusMutation = injectMutation((client) => ({
    mutationFn: async (studentId: string) => {
      return await lastValueFrom(
        this.studentService.changeStudentSupervision(studentId)
      );
    },
    onSuccess: (data: any) => {
      client.invalidateQueries({ queryKey: studentsQueryKey.all });

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data?.message || 'status was changed successfully',
      });
      this.closeModal();
    },
    onError: (error: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'change was not successful',
      });
    },
  }));

  changeStatus() {
    this.changeStatusMutation.mutate(this.student().student_id);
  }
}
