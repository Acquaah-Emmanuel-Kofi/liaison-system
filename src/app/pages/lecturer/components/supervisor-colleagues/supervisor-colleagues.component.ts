import { Component, inject, signal } from '@angular/core';
import { SupervisorColleaguesHeaderComponent } from './components/supervisor-colleagues-header/supervisor-colleagues-header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { TableColumn, TableData } from '../../../../shared/components/table/table.interface';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { filterFacultyDepartment, searchArray } from '../../../../shared/helpers/functions.helper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ILecturersData } from '../../../../shared/interfaces/response.interface';
import { lecturersQueryKey } from '../../../../shared/helpers/query-keys.helper';

@Component({
  selector: 'liaison-supervisor-colleagues',
  standalone: true,
  imports: [SupervisorColleaguesHeaderComponent, TableComponent, CommonModule],
  templateUrl: './supervisor-colleagues.component.html',
  styleUrl: './supervisor-colleagues.component.scss',
  providers: [MessageService],
})
export class SupervisorColleaguesComponent {
  columns: TableColumn[] = [
    { label: 'Staff ID', key: 'staff_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: 'Company', key: 'company' },
    { label: 'Actions', key: 'action', isAction: true },
  ];

  currentPage = signal<number>(1);
  first = signal<number>(0);
  pageSize = signal<number>(10);
  searchTerm = signal<string>('');
  HideCheckbox = true;

  filteredData = signal<TableData[]>([]);

  private _dashboardService = inject(DashboardService);

  supervisorsQuery = injectQuery(() => ({
    queryKey: [...lecturersQueryKey.data(this.currentPage(), this.pageSize())],
    queryFn: async () => {
      const response = await this._dashboardService.getStatAnalytics();

      return this.destructureStudents(response.data.lecturer.lecturers);
    },
  }));

  destructureStudents(data: ILecturersData[]): TableData[] {
    if (!data) return [];

    return data.map((lecturer: ILecturersData) => ({
      staff_id: lecturer.lecturerId,
      name: `${lecturer.firstName} ${lecturer.lastName}`,
      faculty: lecturer.faculty,
      department: lecturer.department,
      company: lecturer.company,
    }));
  }

  handleSearchTerm(value: string) {
    this.searchTerm.set(value);

    const filteredLecturers = searchArray(
      this.supervisorsQuery.data()!,
      value,
      ['staff_id', 'name', 'company']
    );

    this.filteredData.set(filteredLecturers ?? []);
  }

  handleFilterValue(selection: { faculty: string; department: string }) {
    this.searchTerm.set(selection.faculty);

    const filteredLecturers = filterFacultyDepartment(
      this.supervisorsQuery.data()!,
      selection.faculty,
      selection.department
    );

    this.filteredData.set(filteredLecturers ?? []);
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);

    this.currentPage.set(data.page + 1);

    this.pageSize.set(data.rows);
  }

  refetchData() {
    this.supervisorsQuery.refetch();
  }
}
