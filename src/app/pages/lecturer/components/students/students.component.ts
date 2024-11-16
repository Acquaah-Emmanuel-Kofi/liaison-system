import {Component, inject, signal} from '@angular/core';
import { LecturerStudentsHeaderComponent } from './components/lecturer-students-header/lecturer-students-header.component';
import {TableComponent} from "../../../../shared/components/table/table.component";
import {NgTemplateOutlet} from "@angular/common";
import {TableColumn, TableData} from "../../../../shared/components/table/table.interface";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {studentsQueryKey} from "../../../../shared/helpers/query-keys.helper";
import {GlobalVariablesStore} from "../../../../shared/store/global-variables.store";
import {StudentTableService} from "../../../admin/service/students-table/student-table.service";
import {IStudentData} from "../../../../shared/interfaces/response.interface";
import {formatDateToDDMMYYYY} from "../../../../shared/helpers/functions.helper";

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [LecturerStudentsHeaderComponent, TableComponent, NgTemplateOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  private globalStore = inject(GlobalVariablesStore);
  studentService = inject(StudentTableService);

  filteredData = signal<TableData[]>([]);
  searchTerm = signal<string>('');
  currentPage = signal<number>(1);
  first = signal<number>(0);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Place of internship', key: 'place_of_internships' },
    { label: 'Town', key: 'start_date' },
    { label: 'Landmark', key: 'end_start' },
    { label: 'Date Resumed', key: 'status' },
  ];


  studentsInternQuery = injectQuery(() => ({
    queryKey: [...studentsQueryKey.data(this.globalStore.endYear(),this.globalStore.startYear(),this.globalStore.type(),this.currentPage(), this.totalData())],
    queryFn: async () => {
      const response = await this.studentService.getAllStudents(
        this.globalStore.startYear(),
        this.globalStore.endYear(),
        this.globalStore.type(),
        this.currentPage(),
        this.pageSize(),
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
      status: student.status,
      end_start: formatDateToDDMMYYYY(student.endDate),
      start_date: formatDateToDDMMYYYY(student.startDate),
      place_of_internships: student.placeOfInternship,
    }));
  }


  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);

    this.currentPage.set(data.page + 1);

    this.pageSize.set(data.rows);
  }

}
