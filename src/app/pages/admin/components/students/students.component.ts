import {Component, inject} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn, TableData } from '../../../../shared/components/table/table.interface';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [HeaderComponent, TableComponent, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  // private router: Router, private activatedRoute: ActivatedRoute
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: '', key: 'action', isAction: true },
  ];

  data: TableData[] = [
    {
      student_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      faculty: 'Engineering',
    },
    {
      student_id: '#M234',
      name: 'Brenda Jones',
      department: 'Plant Engineering',
      faculty: 'Engineering',
    },
    {
      student_id: '#M234',
      name: 'Brenda Jones',
      department: 'Electrical Engineering',
      faculty: 'Engineering',
    },
    {
      student_id: '#M234',
      name: 'Killer Jones',
      department: 'Computer Science',
      faculty: 'Applied Sciences',
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
