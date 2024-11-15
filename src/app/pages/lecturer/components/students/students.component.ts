import { Component } from '@angular/core';
import { LecturerStudentsHeaderComponent } from './components/lecturer-students-header/lecturer-students-header.component';

@Component({
  selector: 'liaison-students',
  standalone: true,
  imports: [LecturerStudentsHeaderComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

}
