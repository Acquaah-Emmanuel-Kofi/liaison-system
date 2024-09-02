import { Component } from '@angular/core';
import {StatCardComponent} from "../../components/stat-card/stat-card.component";
import {startCard} from "../../shared/interfaces/stat-card.interface";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'liaison-admin-dashboard',
  standalone: true,
  imports: [
    StatCardComponent,
    NgOptimizedImage
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  statCard: startCard [] = [
    {
      title: 'Lectures',
      number: 100,
      iconSrc: 'assets/lectures.svg'
    },
    {
      title: 'Students',
      number: 100,
      iconSrc: 'assets/students.svg'
    },
    {
      title: 'Internships',
      number: 100,
      iconSrc: 'assets/interns.svg'
    }

  ]

}
