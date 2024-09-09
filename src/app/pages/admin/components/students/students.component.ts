import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn, TableData } from '../../../../shared/components/table/table.interface';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { StudentTableService } from "../../service/students-table/student-table.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { getStudentResponse, studentData } from "../../../../shared/interfaces/upload.interface";
import { injectQuery } from "@tanstack/angular-query-experimental";

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [HeaderComponent, TableComponent, RouterOutlet, ToastModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [MessageService]
})
export class StudentsComponent {
  messageService = inject(MessageService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  studentService = inject(StudentTableService);
  selectedRowData: TableData | null = null;

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: 'Actions', key: 'action', isAction: true },

  ];

  query = injectQuery(() => ({
    queryKey: ['All students'],
    queryFn: () => this.studentService.getAllStudents(),
  }));

  tableData: Signal<TableData[]> = computed(() => {
    const data = this.query.data();
    return this.destructureStudents(data);
  });

  data: TableData[] = [];

  constructor() {
    effect(() => {
      this.data = this.tableData();
    });
  }


  destructureStudents(response: getStudentResponse | undefined): TableData[] {
    if (!response || !response.data) return [];

    return response.data.map((student: studentData) => ({
      student_id: student.id,
      name: student.name,
      faculty: student.faculty,
      department: student.department,
      course: student.course,
      age: student.age,
      gender: student.gender,
      phone: student.phone
    }));
  }

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }

  handleRowSelection(row: TableData): void {
    console.log('Row selected:', row);
  }

  handleClosePanel() {
    this.selectedRowData = null;  // Clear selected row data to hide the preview panel
  }

  handleActionClick(row: TableData): void {
    this.selectedRowData = row;
  }
}
