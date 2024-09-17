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
import { searchArray } from '../../../../shared/helpers/constants.helper';

@Component({
  selector: 'liaison-lecturers',
  standalone: true,
  imports: [HeaderComponent, TableComponent, CommonModule],
  templateUrl: './lecturers.component.html',
  styleUrl: './lecturers.component.scss',
})
export class LecturersComponent {
  columns: TableColumn[] = [
    { label: 'Staff ID', key: 'staff_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Faculty', key: 'faculty' },
    { label: '', key: 'action', isAction: true },
  ];

  currentPage!: number;
  totalData!: number;
  pageSize!: number;

  filteredData = signal<TableData[]>([]);

  private _dataServices = inject(StudentTableService);

  lecturersQuery = injectQuery(() => ({
    queryKey: [...lecturersQueryKey.data(this.currentPage, this.totalData)],
    queryFn: async () => {
      const response = await lastValueFrom<IGetLecturersResponse>(
        this._dataServices.getAllLecturers(this.currentPage, this.pageSize)
      );

      this.currentPage = response.data.currentPage!;
      this.totalData = response.data.totalData!;
      this.pageSize = response.data.pageSize!;

      return this.destructureStudents(response.data.page.content);
    },
  }));

  destructureStudents(data: ILecturersData[] | undefined): TableData[] {
    if (!data) return [];

    return data.map((lecturer: ILecturersData) => ({
      staff_id: lecturer.lecturerId,
      name: `${lecturer.firstName} ${lecturer.lastName}`,
      faculty: lecturer.faculty,
      department: lecturer.department,
    }));
  }

  handleRowSelection(row: TableData) {
    console.log('Row selected:', row);
  }

  handleActionClick(row: TableData) {
    console.log('Action clicked for row:', row);
  }

  handleSearchTerm(value: string) {
    const filteredLecturers = searchArray(this.lecturersQuery.data()!, value, [
      'name',
      'department',
      'faculty',
    ]);

    this.filteredData.set(filteredLecturers ?? []);
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.currentPage = data.first;
    this.pageSize = data.rows;
    this.totalData = data.page + 1;
  }
}
