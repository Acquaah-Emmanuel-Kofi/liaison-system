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
  HidePagination = true;

  constructor() {
    this.populateYears();
  }


  statCard: startCard [] = [
    {
      title: 'Lectures',
      number: 100,
      iconSrc: 'assets/lectures.svg',
      navigateTo:'/admin/lecturers'
    },
    {
      title: 'Students',
      number: 100,
      iconSrc: 'assets/students.svg',
      navigateTo:'/admin/students'

    },
    {
      title: 'Internships',
      number: 100,
      iconSrc: 'assets/interns.svg',
      navigateTo:'/admin/internships'
    }

  ]
  columns: TableColumn[] = [
    {
      label: "Regions",
      key: "Region",
    },
    {
      label: "Sub-Zones",
      key: "sub_zones",
    },
    {
      label: "No of Students",
      key: "No_of_Students",
    }
  ]

  data: TableData[] = [
    {
      Region: 'Western',
      sub_zones: 15,
      No_of_Students: 300,
    },
    {
      Region: 'Greater Accra',
      sub_zones: 20,
      No_of_Students: 800,
    },
    {
      Region: 'Central',
      sub_zones: 12,
      No_of_Students: 230,
    },
    {
      Region: 'Eastern',
      sub_zones: 10,
      No_of_Students: 400,
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
