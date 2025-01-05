import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import { StudentTableService } from '../../service/students-table/student-table.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { attachmentsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { IStudentData } from '../../../../shared/interfaces/response.interface';
import { CommonModule } from '@angular/common';
import {
  filterStudentsByDateRange,
  filterStudentsByStatus,
  formatDateToDDMMYYYY,
  searchArray,
} from '../../../../shared/helpers/functions.helper';
import { SidebarService } from '../../../../shared/services/sidebar/sidebar.service';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'liaison-internships',
  standalone: true,
  imports: [HeaderComponent, TableComponent, CommonModule, RouterOutlet],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss',
})
export class InternshipsComponent implements OnInit {
  protected sidebarService = inject(SidebarService);
  private globalStore = inject(GlobalVariablesStore);

  currentPage = signal<number>(1);
  first = signal<number>(0);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);
  searchTerm = signal<string>('');
  internshipType!: boolean;
  currentYear: number = new Date().getFullYear();
  lastyear = this.currentYear - 1;
  HideCheckbox = true;

  filteredData = signal<TableData[]>([]);

  private studentService = inject(StudentTableService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.sidebarService.isSwitched$.subscribe((value: boolean) => {
      this.internshipType = value;
    });
  }

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Place of internships', key: 'place_of_internships' },
    { label: 'Start Date', key: 'start_date' },
    // { label: 'End Date', key: 'end_start' },
    { label: 'Status', key: 'status' },
  ];

  studentsQuery = injectQuery(() => ({
    queryKey: [
      ...attachmentsQueryKey.data(
        this.globalStore.endYear(),
        this.globalStore.startYear(),
        this.globalStore.type(),
        this.globalStore.semester(),
        this.currentPage(),
        this.totalData()
      ),
    ],
    queryFn: async () => {
      const response = await this.studentService.getAllAttachments();

      this.totalData.set(response.data.length);

      return this.destructureStudents(response.data);
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

    const filteredStudents = searchArray(this.studentsQuery.data()!, value, [
      'name',
      'placeOfInternship',
      'student_id',
    ]);

    this.filteredData.set(filteredStudents ?? []);
  }

  handleDateFilter(dates: { startDate: string; endDate: string }) {
    const filteredStudents = filterStudentsByDateRange(
      this.studentsQuery.data() as IStudentData[],
      dates.startDate,
      dates.endDate
    );

    this.filteredData.set(filteredStudents ?? []);
  }

  handleStatusFilter(status: 'IN_PROGRESS' | 'COMPLETED') {
    const filteredStudents = filterStudentsByStatus(
      this.studentsQuery.data() as IStudentData[],
      status
    );

    this.filteredData.set(filteredStudents ?? []);
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);

    this.currentPage.set(data.page + 1);

    this.pageSize.set(data.rows);
  }

  refetchData() {
    this.studentsQuery.refetch();
  }
}
