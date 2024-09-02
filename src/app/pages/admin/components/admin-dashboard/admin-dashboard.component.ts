import {Component, inject} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {StatCardComponent} from "../../../../shared/components/stat-card/stat-card.component";
import {startCard} from "../../../../shared/interfaces/stat-card.interface";
import {AdminChartComponent} from "../admin-chart/admin-chart.component";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {TableColumn, TableData} from "../../../../shared/components/table/table.interface";

@Component({
  selector: 'liaison-admin-dashboard',
  standalone: true,
  imports: [
    StatCardComponent,
    NgOptimizedImage,
    NgForOf,
    StatCardComponent,
    AdminChartComponent,
    TableComponent,

  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  route = inject(Router)
  currentYear: number = new Date().getFullYear();
  years: number[] = [];
  HideCheckbox = true;

  constructor() {
    this.populateYears();
  }


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
  columns: TableColumn[] = [
    {
      label: "Regions",
      key: "show",
    },
    {
      label: "Sub-Zones",
      key: "show",
    },
    {
      label: "No of Students",
      key: "show",
    }
  ]

  data: TableData[] = [
    {

    },
    {

    },
    {

    }
  ];


  populateYears() {
    const startYear = 2020;
    for (let year = this.currentYear; year >= startYear; year--) {
      this.years.push(year);
    }
  }


  navigateToUpload() {
    this.route.navigate(['admin/upload'])
  }



}
