import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';

@Component({
  selector: 'liaison-internships',
  standalone: true,
  imports: [HeaderComponent, TableComponent],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss',
})
export class InternshipsComponent {
  columns: TableColumn[] = [
    { label: 'Student ID', key: 'student_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Place of internships', key: 'place_of_internships' },
    { label: 'Start Date', key: 'start_date' },
    { label: 'End Date', key: 'end_start' },
    { label: 'Status', key: 'status' },
    // { label: '', key: 'action', isAction: true },
  ];

  data: TableData[] = [
    {
      imageUrl: 'assets/images/profile.png',
      student_id: '#M234',
      name: 'Brenda Jones',
      department: 'Engineering',
      place_of_internships: 'UCC',
      start_date: '05/02/23',
      end_start: '05/05/23',
      status: 'In progress',
    },
    {
      student_id: '#M234',
      name: 'Emmanuel Acquaah',
      department: 'Computer Science',
      place_of_internships: 'AmaliTech',
      start_date: '05/02/23',
      end_start: '05/05/23',
      status: 'Completed',
    },
    {
      student_id: '#M234',
      name: 'Kojo Setsofia',
      department: 'Fashion',
      place_of_internships: 'AmaliTech',
      start_date: '05/02/23',
      end_start: '05/05/23',
      status: 'Completed',
    },
    {
      student_id: '#M234',
      name: 'Ahadjie Bless',
      department: 'Printing',
      place_of_internships: 'AmaliTech',
      start_date: '05/02/23',
      end_start: '05/05/23',
      status: 'In progress',
    },
    {
      student_id: '#M234',
      name: 'Safo Kwadwo',
      department: 'Sculpture',
      place_of_internships: 'GES',
      start_date: '05/02/23',
      end_start: '05/05/23',
      status: 'Completed',
    },
  ];

  handleRowSelection(row: TableData) {
    console.log('Row selected:', row);
  }

  handleActionClick(row: TableData) {
    console.log('Action clicked for row:', row);
  }
}
                                                                        