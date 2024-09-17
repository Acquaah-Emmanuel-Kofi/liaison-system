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

  private _dataServices = inject(StudentTableService);

  lecturersQuery = injectQuery(() => ({
    queryKey: [...lecturersQueryKey.data()],
    queryFn: async () => {
      const response = await lastValueFrom<IGetLecturersResponse>(
        this._dataServices.getAllLeturers()
      );

      return this.destructureStudents(response.data.page.content);
    },
  }));

  destructureStudents(data: ILecturersData[] | undefined): TableData[] {
    if (!data) return [];

    return data.map((lecturer: ILecturersData) => ({
      staff_id: lecturer.id,
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
}
