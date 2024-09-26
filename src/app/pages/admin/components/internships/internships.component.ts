import { Component, inject, signal } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import { StudentTableService } from '../../service/students-table/student-table.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { studentsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { IStudentData } from '../../../../shared/interfaces/response.interface';
import { CommonModule } from '@angular/common';
import { formatDateToDDMMYYYY, searchArray } from '../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-internships',
  standalone: true,
  imports: [HeaderComponent, TableComponent, CommonModule],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss',
})
export class InternshipsComponent {
  currentPage = signal<number>(1);
  first = signal<number>(1);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);
  searchTerm = signal<string>('');

  filteredData = signal<TableData[]>([]);

  studentService = inject(StudentTableService);

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Place of internships', key: 'place_of_internships' },
    { label: 'Start Date', key: 'start_date' },
    { label: 'End Date', key: 'end_start' },
    { label: 'Status', key: 'status' },
  ];

  lecturersQuery = injectQuery(() => ({
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
      status: student.status,
      end_start: formatDateToDDMMYYYY(student.endDate),
      start_date: formatDateToDDMMYYYY(student.startDate),
      place_of_internships: student.placeOfInternship,
    }));
  }

  handleSearchTerm(value: string) {
    this.searchTerm.set(value);

    const filteredLecturers = searchArray(this.lecturersQuery.data()!, value, [
      'name',
      'placeOfInternship',
      'student_id',
    ]);

    this.filteredData.set(filteredLecturers ?? []);
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);

    this.currentPage.set(data.page + 1);

    this.pageSize.set(data.rows);
  }

  refetchData() {
    this.lecturersQuery.refetch()
  }
}
