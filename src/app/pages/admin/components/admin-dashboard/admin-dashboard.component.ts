import { Component, computed, inject, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { AdminChartComponent } from '../admin-chart/admin-chart.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import { IStartCard } from '../../../../shared/interfaces/constants.interface';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UserStore } from '../../../../shared/store/user.store';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { statAnalyticsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { IStartAnalytics } from '../../../../shared/interfaces/response.interface';

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
    ToggleButtonModule,
    InputSwitchModule,
    NgClass,
    CascadeSelectModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  route = inject(Router);
  years: { name: string; value: string }[] = [];
  selectedYear: string | null = null;
  currentYear: number = new Date().getFullYear();
  lastyear = this.currentYear - 1;
  HideCheckbox = true;
  HidePagination = true;

  statCard: IStartCard[] = [
    {
      title: 'Lecturers',
      count: 0,
      iconSrc: 'assets/lectures.svg',
      navigateTo: '/admin/lecturers',
    },
    {
      title: 'Students',
      count: 0,
      iconSrc: 'assets/students.svg',
      navigateTo: '/admin/students',
    },
    {
      title: 'Attachment',
      count: 0,
      iconSrc: 'assets/interns.svg',
      navigateTo: '/admin/internships',
    },
  ];

  columns: TableColumn[] = [
    {
      label: 'Regions',
      key: 'Region',
    },
    {
      label: 'Sub-Zones',
      key: 'sub_zones',
    },
    {
      label: 'No of Students',
      key: 'No_of_Students',
    },
  ];

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
    },
  ];

  readonly userStore = inject(UserStore);

  public username = computed(() => this.userStore.firstName());

  private _dashboardService = inject(DashboardService);

  constructor() {
    this.populateYears();
  }

  ngOnInit() {
    this.updateCountsFromApiResponse(this.analyticsQuery.data()!);
  }

  populateYears() {
    const startYear = 2020;
    for (let year = this.currentYear; year >= startYear; year--) {
      const academicYear = year - 1 + '/' + year;
      this.years.push({ name: academicYear, value: academicYear });
    }
  }

  navigateToUpload() {
    this.route.navigate(['admin/upload']);
  }

  analyticsQuery = injectQuery(() => ({
    queryKey: [...statAnalyticsQueryKey.data('SEMESTER_OUT', 2020, 2024)],
    queryFn: async () => {
      const response = await this._dashboardService.getStatAnalytics(
        'SEMESTER_OUT',
        2020,
        2024
      );

      this.updateCountsFromApiResponse(response.data);

      return response.data;
    },
  }));

  updateCountsFromApiResponse(data: IStartAnalytics) {
    this.statCard = this.statCard.map((card) => {
      switch (card.title) {
        case 'Lecturers':
          return { ...card, count: data.lectures };
        case 'Students':
          return { ...card, count: data.students };
        case 'Attachment':
          return { ...card, count: data.internships };
        default:
          return card;
      }
    });
  }
}
