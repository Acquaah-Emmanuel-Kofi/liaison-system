import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {getFirstAndLastInitial} from "../../../../../assets/utils/getInitials"

@Component({
  selector: 'liaison-supervision',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CardModule,
    Button
  ],
  templateUrl: './supervision.component.html',
  styleUrl: './supervision.component.scss'
})
export class SupervisionComponent {
  lecturers = [
    {
      name: 'Dr. John Doe',
      role: 'Professor',
      zone: 'Zone A',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Jane Smith',
      role: 'Senior Lecturer',
      zone: 'Zone A',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Sam Wilson',
      role: 'Lecturer',
      zone: 'Zone A',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Emily Clark',
      role: 'Assistant Professor',
      zone: 'Zone A',
      image: 'https://via.placeholder.com/150',
    },
  ];
  protected readonly getFirstAndLastInitial = getFirstAndLastInitial;
}
