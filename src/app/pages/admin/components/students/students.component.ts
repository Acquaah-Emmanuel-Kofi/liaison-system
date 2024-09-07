import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn, TableData } from '../../../../shared/components/table/table.interface';

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [HeaderComponent, TableComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Credit Hours', key: 'credit_hours' },
    { label: '', key: 'action', isAction: true },
  ];

  data: TableData[] = [
    {
      student_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      credit_hours: '32',
    },
    {
      student_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      credit_hours: '32',
    },
    {
      student_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      credit_hours: '32',
    },
    {
      student_id: '#M234',
      name: 'Killer Jones',
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
