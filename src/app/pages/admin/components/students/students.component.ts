import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn, TableData } from '../../../../shared/components/table/table.interface';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { StudentTableService } from "../../service/students-table/student-table.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { studentsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { IGetStudentResponse, IStudentData } from '../../../../shared/interfaces/response.interface';

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [HeaderComponent, TableComponent, RouterOutlet, ToastModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [MessageService],
})
export class StudentsComponent {
  messageService = inject(MessageService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  studentService = inject(StudentTableService);
  selectedRowData: TableData | null = null;

  first:number| undefined = 0
  pageSize: number| undefined = 0
  totalData: number | undefined = 0

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: 'Actions', key: 'action', isAction: true },
  ];

  constructor() {
    effect(() => {
      this.data = this.tableData();
    });
  }

  query = injectQuery(() => ({
    queryKey: [...studentsQueryKey.data()],
    queryFn: () => this.studentService.getAllStudents(),
  }));

  tableData: Signal<TableData[]> = computed(() => {
    const data = this.query.data();
    this.pageSize =data?.data?.pageSize
    this.totalData = data?.data.totalData
    this.first = data?.data.currentPage
    return this.destructureStudents(data);
  });

  data: TableData[] = [];

  destructureStudents(response: IGetStudentResponse | undefined): TableData[] {
    if (!response || !response.data.students) return [];

    return response.data.students.map((student: IStudentData) => ({
      student_id: student.id,
      name: student.name,
      faculty: student.faculty,
      department: student.department,
      course: student.course,
      age: student.age,
      gender: student.gender,
      phone: student.phone,
    }));
  }

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }


  adjustPaginatorRows() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1536) {
      this.pageSize = 10;
    } else {
      this.pageSize = 5;
    }
  }

  handleRowSelection(row: TableData): void {
    console.log('Row selected:', row);
  }

  handleClosePanel() {
    this.selectedRowData = null;
  }

  handleActionClick(row: TableData): void {
    this.selectedRowData = row;
  }
}
