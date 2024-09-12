import {Component, computed, effect, HostListener, inject, OnInit, Signal} from '@angular/core';
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
import {Subscription} from "rxjs";

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [HeaderComponent, TableComponent, RouterOutlet, ToastModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [MessageService],
})
export class StudentsComponent implements OnInit{
  messageService = inject(MessageService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  studentService = inject(StudentTableService);
  selectedRowData: TableData | null = null;
  searchTerm: string = '';
  first: number | undefined = 0;
  pageSize: number = 10;
  totalData?: number;
  pageNumber = 1;
  private searchSubscription: Subscription;


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustPaginatorRows();
    this.query.refetch();
  }

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Department', key: 'department' },
    { label: 'Actions', key: 'action', isAction: true },
  ];

  ngOnInit() {

  }

  constructor() {
    this.adjustPaginatorRows();

    this.searchSubscription = this.studentService.searchResults$.subscribe(
      results => {
        if (results) {
          this.data = this.destructureStudents(results);
          this.totalData = results.data.totalData;
          this.first = results.data.currentPage;
        } else {
          this.query.refetch();
        }
      }
    );

    effect(() => {
      this.data = this.tableData();
    });
  }

  query = injectQuery(() => ({
    queryKey: [...studentsQueryKey.data(), this.pageNumber, this.pageSize],
    queryFn: () => this.studentService.getAllStudents(this.pageNumber, this.pageSize),
  }));



  tableData: Signal<TableData[]> = computed(() => {
    const data = this.query.data();
    this.pageSize = data?.data?.pageSize ?? this.pageSize;
    this.totalData = data?.data.totalData;
    this.first = data?.data.currentPage;
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
    if (screenWidth <= 1536) {
      this.pageSize = 5;
    } else {
      this.pageSize = 10;
    }
  }

  async searchStudents() {
    if (this.searchTerm) {
      this.searchTerm.trim()
      try {
        const result = await this.studentService.searchStudent(this.searchTerm);
        this.data = this.destructureStudents(result);
        this.totalData = result.data.totalData;
        this.pageNumber = 1;
        this.first = 0;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to search students' });
      }
    } else {
      this.query.refetch();
    }
  }

  handlePageChange(event: any) {
    this.pageNumber = event.page + 1;
    this.pageSize = event.rows;
    this.first = event.first;
    this.query.refetch();
  }


  handleActionClick(row: TableData): void {
    this.selectedRowData = row;
  }
}
