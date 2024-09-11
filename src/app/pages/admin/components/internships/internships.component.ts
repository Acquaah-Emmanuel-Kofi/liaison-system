import {Component, computed, effect, inject, Signal} from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import {StudentTableService} from "../../service/students-table/student-table.service";
import {injectQuery} from "@tanstack/angular-query-experimental";
import { studentsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { IGetStudentResponse, IStudentData } from '../../../../shared/interfaces/response.interface';
import { formatDateToDDMMYYYY } from '../../../../shared/helpers/constants.helper';

@Component({
  selector: 'liaison-internships',
  standalone: true,
  imports: [HeaderComponent, TableComponent],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss',
})
export class InternshipsComponent {
  studentService = inject(StudentTableService);

  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Place of internships', key: 'place_of_internships' },
    { label: 'Start Date', key: 'start_date' },
    { label: 'End Date', key: 'end_start' },
    { label: 'Status', key: 'status' },
  ];

  data: TableData[] = [];

  query = injectQuery(() => ({
    queryKey: [...studentsQueryKey.data()],
    queryFn: () => this.studentService.getAllStudents(),
  }));

  tableData: Signal<TableData[]> = computed(() => {
    const data = this.query.data();
    return this.destructureStudents(data);
  });

  constructor() {
    effect(() => {
      this.data = this.tableData();
    });
  }


  destructureStudents(response: IGetStudentResponse | undefined): TableData[] {
    if (!response || !response.data.students) return [];

    return response.data.students.map((student: IStudentData) => ({
      student_id: student.id,
      name: student.name,
      faculty: student.faculty,
      department: student.department,
      course: student.course,
      status: student.age,
      end_start: formatDateToDDMMYYYY(student.endDate),
      start_date: formatDateToDDMMYYYY(student.startDate),
      place_of_internships: student.placeOfInternship,
    }));
  }

  handleRowSelection(row: TableData) {
    console.log('Row selected:', row);
  }

  handleActionClick(row: TableData) {
    console.log('Action clicked for row:', row);
  }
}
