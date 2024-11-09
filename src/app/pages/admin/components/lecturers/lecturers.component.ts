import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lecturersQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { StudentTableService } from '../../service/students-table/student-table.service';
import {
  IGetLecturersResponse,
  ILecturersData,
} from '../../../../shared/interfaces/response.interface';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import {
  filterFacultyDepartment,
  searchArray,
} from '../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-lecturers',
  standalone: true,
  imports: [HeaderComponent, TableComponent, CommonModule],
  templateUrl: './lecturers.component.html',
  styleUrl: './lecturers.component.scss',
  providers: [MessageService],
})
export class LecturersComponent {
  columns: TableColumn[] = [
    { label: 'Staff ID', key: 'staff_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: '', key: 'action', isAction: true },
  ];

  currentPage = signal<number>(1);
  first = signal<number>(1);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);
  searchTerm = signal<string>('');

  filteredData = signal<TableData[]>([]);

  private _dataServices = inject(StudentTableService);

  lecturersQuery = injectQuery(() => ({
    queryKey: [...lecturersQueryKey.data(this.currentPage(), this.totalData())],
    queryFn: async () => {
      const response = await lastValueFrom<IGetLecturersResponse>(
        this._dataServices.getAllLecturers(this.currentPage(), this.pageSize())
      );

      this.totalData.set(response.data.totalData);

      return this.destructureStudents(response.data.page.content);
    },
  }));

  destructureStudents(data: ILecturersData[]): TableData[] {
    if (!data) return [];

    return data.map((lecturer: ILecturersData) => ({
      staff_id: lecturer.lecturerId,
      name: `${lecturer.firstName} ${lecturer.lastName}`,
      faculty: lecturer.faculty,
      department: lecturer.department,
    }));
  }

  handleSearchTerm(value: string) {
    this.searchTerm.set(value);

    const filteredLecturers = searchArray(this.lecturersQuery.data()!, value, [
      'staff_id',
      'name',
    ]);

    this.filteredData.set(filteredLecturers ?? []);
  }

  handleFilterValue(selection: { faculty: string; department: string }) {
    this.searchTerm.set(selection.faculty);

    const filteredLecturers = filterFacultyDepartment(
      this.lecturersQuery.data()!,
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
    this.lecturersQuery.refetch();
  }
}
