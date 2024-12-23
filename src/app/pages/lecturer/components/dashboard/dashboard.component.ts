import { Component, computed, inject, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { UserStore } from '../../../../shared/store/user.store';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { FormsModule } from '@angular/forms';
import { getYears } from '../../../../shared/helpers/functions.helper';
import { TableComponent } from '../../../../shared/components/table/table.component';
import {
  TableColumn,
} from '../../../../shared/components/table/table.interface';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import {
  IStartCard,
  NameValue,
} from '../../../../shared/interfaces/constants.interface';
import { LecturerChartComponent } from '../lecturer-chart/lecturer-chart.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import {
  statAnalyticsQueryKey,
  topIndustriesQueryKey,
} from '../../../../shared/helpers/query-keys.helper';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ILecturerDashboard } from '../../../../shared/interfaces/response.interface';
import { CommonModule } from '@angular/common';
import { SemesterOptions } from '../../../../shared/helpers/constants.helper';

@Component({
  selector: 'liaison-dashboard',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    TableComponent,
    StatCardComponent,
    LecturerChartComponent,
    CommonModule,
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

  semesterOptions: NameValue[] = SemesterOptions;
  selectedSemester: string | null = null;

  HideCheckbox = true;
  HidePagination = true;

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

  topIndustriescolumns: TableColumn[] = [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Town',
      key: 'town',
    },
    {
      label: 'Location',
      key: 'exactLocation',
    },
    {
      label: 'No of students',
      key: 'totalStudents',
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

  handleSemesterChange() {
    if (this.selectedSemester) {
      this.globalStore.setSemester(Number(this.selectedSemester));
    }
  }

  analyticsQuery = injectQuery(() => ({
    queryKey: [
      ...statAnalyticsQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear() ?? this.currentYear,
        this.globalStore.endYear() ?? this.nextYear,
        this.globalStore.semester()
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
          return { ...card, count: data?.company?.totalCompanies };
        case 'Students':
          return { ...card, count: data?.student?.totalStudents };
        case 'Zone Supervisors':
          return { ...card, count: data?.lecturer?.totalLecturers };
        default:
          return card;
      }
    });
  }

  topIndustriesQuery = injectQuery(() => ({
    queryKey: [
      ...topIndustriesQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear() ?? this.currentYear,
        this.globalStore.endYear() ?? this.nextYear,
        this.globalStore.semester()
      ),
    ],
    queryFn: async () => {
      const response = await this._dashboardService.getTopIndustries();

      return response.data;
    },
  }));
}
