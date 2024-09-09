import {Component, inject} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {TableComponent} from '../../../../shared/components/table/table.component';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {TableColumn, TableData} from "../../../../shared/components/table/table.interface";


@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [HeaderComponent, TableComponent, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

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

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }

  handleRowSelection(row: TableData) {
    console.log('Row selected:', row);
  }

  handleActionClick(row: TableData) {
    console.log('Action clicked for row:', row);
  }
}
