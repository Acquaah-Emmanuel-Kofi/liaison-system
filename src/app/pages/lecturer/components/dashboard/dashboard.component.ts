import { Component, computed, inject, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { UserStore } from '../../../../shared/store/user.store';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { FormsModule } from '@angular/forms';
import { getYears } from '../../../../shared/helpers/functions.helper';
import { TableComponent } from '../../../../shared/components/table/table.component';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { IStartCard } from '../../../../shared/interfaces/constants.interface';
import { LecturerChartComponent } from '../lecturer-chart/lecturer-chart.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { statAnalyticsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ILecturerDashboard } from '../../../../shared/interfaces/response.interface';

@Component({
  selector: 'liaison-dashboard',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    TableComponent,
    StatCardComponent,
    LecturerChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly userStore = inject(UserStore);
  private globalStore = inject(GlobalVariablesStore);

  public username = computed(() => this.userStore.firstName());

  years: { name: string; value: string }[] = [];
  selectedYear: string | null = null;
  currentYear: number = new Date().getFullYear();
  nextYear = this.currentYear + 1;

  HideCheckbox = true;
  HidePagination = true;

  columns: TableColumn[] = [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Region',
      key: 'region',
    },
    {
      label: 'Location',
      key: 'location',
    },
    {
      label: 'No of students',
      key: 'studentsNo',
    },
  ];

  data: TableData[] = [
    {
      name: 'Amalitech',
      region: 'Western',
      location: 'Town',
      studentsNo: 30,
    },
    {
      name: 'Ghana Revenue Authority',
      region: 'Eastern',
      location: 'Somanya',
      studentsNo: 24,
    },
    {
      name: 'Qliq Integration',
      region: 'Western',
      location: 'Anaji',
      studentsNo: 14,
    },
    {
      name: 'Eastern',
      region: 'Central',
      location: 'Cape coast',
      studentsNo: 12,
    },
  ];

  statCard: IStartCard[] = [
    {
      title: 'Students',
      count: 0,
      iconSrc: 'assets/students.svg',
      navigateTo: '/lecturer/students',
      show: true,
    },
    {
      title: 'Industries',
      count: 0,
      iconSrc: 'assets/interns.svg',
      navigateTo: '/admin/internships',
      show: false,
    },
    {
      title: 'Zone Supervisors',
      count: 0,
      iconSrc: 'assets/lectures.svg',
      navigateTo: '/admin/internships',
      show: false,
    },
  ];

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
      const academicYear = year + '/' + (year + 1);
      this.years.push({ name: academicYear, value: academicYear });
    }
  }

  getYears() {
    if (this.selectedYear) {
      const year = getYears(this.selectedYear);

      if (year) {
        this.globalStore.setStartOfAcademicYear(year?.startYear);
        this.globalStore.setEndOfAcademicYear(year?.endYear);
      }
    }
  }

  analyticsQuery = injectQuery(() => ({
    queryKey: [
      ...statAnalyticsQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear() ?? this.currentYear,
        this.globalStore.endYear() ?? this.nextYear
      ),
    ],
    queryFn: async () => {
      const response = await this._dashboardService.getStatAnalytics();
      
      this.updateCountsFromApiResponse(response.data);
      return response.data;
    },
  }));

  updateCountsFromApiResponse(data: ILecturerDashboard) {
    this.statCard = this.statCard.map((card) => {
      switch (card.title) {
        case 'Industries':
          return { ...card, count: data.company.totalCompanies };
        case 'Students':
          return { ...card, count: data.student.totalStudents };
        case 'Zone Supervisors':
          return { ...card, count: data.lecturer.totalLecturers };
        default:
          return card;
      }
    });
  }
}
