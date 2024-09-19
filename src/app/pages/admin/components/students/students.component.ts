import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { StudentTableService } from '../../service/students-table/student-table.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { studentsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { IStudentData } from '../../../../shared/interfaces/response.interface';
import { CommonModule } from '@angular/common';
import { searchArray } from '../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [
    HeaderComponent,
    TableComponent,
    RouterOutlet,
    ToastModule,
    CommonModule,
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [MessageService],
})
export class StudentsComponent {
  messageService = inject(MessageService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  studentService = inject(StudentTableService);

  currentPage = signal<number>(1);
  first = signal<number>(1);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);
  searchTerm = signal<string>('');

  filteredData = signal<TableData[]>([]);

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: 'Actions', key: 'action', isAction: true },
  ];

  studentsQuery = injectQuery(() => ({
    queryKey: [...studentsQueryKey.data(this.currentPage(), this.totalData())],
    queryFn: async () => {
      const response = await this.studentService.getAllStudents(
        this.currentPage(),
        this.pageSize()
      );

      this.totalData.set(response.data.totalData);

      return this.destructureStudents(response.data.students);
    },
  }));

  destructureStudents(data: IStudentData[]): TableData[] {
    if (!data) return [];

    return data.map((student: IStudentData) => ({
      student_id: student.id,
      name: student.name,
      faculty: student.faculty,
      department: student.department,
      course: student.course,
      age: student.age,
      gender: student.gender,
      phone: student.phone,
    }));
  }

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }

  adjustPaginatorRows() {
    const screenWidth = window.innerWidth;
    screenWidth <= 1536 ? this.pageSize.set(5) : this.pageSize.set(10);
  }

  handleSearchTerm(value: string) {
    this.searchTerm.set(value);

    const filteredLecturers = searchArray(this.studentsQuery.data()!, value, [
      'name',
      'student_id',
    ]);

    this.filteredData.set(filteredLecturers ?? []);
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);

    this.currentPage.set(data.page + 1);

    this.pageSize.set(data.rows);
  }
}
