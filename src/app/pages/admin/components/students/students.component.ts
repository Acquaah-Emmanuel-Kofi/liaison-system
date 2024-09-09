import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn, TableData } from '../../../../shared/components/table/table.interface';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { StudentTableService } from "../../service/students-table/student-table.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import {studentData} from "../../../../shared/interfaces/upload.interface";

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [HeaderComponent, TableComponent, RouterOutlet, ToastModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
  providers: [MessageService]
})
export class StudentsComponent implements OnInit {
  messageService = inject(MessageService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  studentService = inject(StudentTableService);

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: 'Actions', key: 'action', isAction: true },
  ];

  data: TableData[] = [];

  ngOnInit() {
    this.fetchStudentData();
  }

  fetchStudentData(): void {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.data = this.destructureStudents(students.data);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message || 'Failed to fetch data' });
      }
    });
  }

  destructureStudents(students: studentData[]): TableData[] {
    return students.map((student: studentData) => ({
      student_id: student.id,
      name: student.name,
      faculty: student.faculty,
      department: student.department,
    }));
  }

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }

  handleRowSelection(row: TableData): void {
    console.log('Row selected:', row);
  }

  handleActionClick(row: TableData): void {
    console.log('Action clicked for row:', row);
  }
}
