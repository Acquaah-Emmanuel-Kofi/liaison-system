import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn, TableData } from '../../../../shared/components/table/table.interface';

@Component({
  selector: 'liaison-lecturers',
  standalone: true,
  imports: [HeaderComponent, TableComponent],
  templateUrl: './lecturers.component.html',
  styleUrl: './lecturers.component.scss',
})
export class LecturersComponent {
  columns: TableColumn[] = [
    { label: 'Staff ID', key: 'staff_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Credit Hours', key: 'credit_hours' },
    { label: '', key: 'action', isAction: true },
  ];

  data: TableData[] = [
    {
      staff_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      credit_hours: '32',
    },
    {
      staff_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      credit_hours: '32',
    },
    {
      staff_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      credit_hours: '32',
    },
    {
      staff_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      credit_hours: '32',
    },
  ];

  handleRowSelection(row: TableData) {
    console.log('Row selected:', row);
  }

  handleActionClick(row: TableData) {
    console.log('Action clicked for row:', row);
  }
}
