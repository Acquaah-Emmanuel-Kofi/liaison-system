import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { AdminChartComponent } from '../admin-chart/admin-chart.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn } from '../../../../shared/components/table/table.interface';
import {
  IStartCard,
  NameValue,
} from '../../../../shared/interfaces/constants.interface';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UserStore } from '../../../../shared/store/user.store';
import { injectQuery } from '@tanstack/angular-query-experimental';
import {
  statAnalyticsQueryKey,
  studentAssumptionOfDutyLogsQueryKey,
} from '../../../../shared/helpers/query-keys.helper';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { IStartAnalytics } from '../../../../shared/interfaces/response.interface';
import { getYears } from '../../../../shared/helpers/functions.helper';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { CommonModule } from '@angular/common';
import { SemesterOptions } from '../../../../shared/helpers/constants.helper';

@Component({
  selector: 'liaison-admin-dashboard',
  standalone: true,
  imports: [
    StatCardComponent,
    StatCardComponent,
    AdminChartComponent,
    TableComponent,
    ToggleButtonModule,
    InputSwitchModule,
    CascadeSelectModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  route = inject(Router);
  semesterOptions: NameValue[] = SemesterOptions;
  selectedSemester: string | null = null;

  years: NameValue[] = [];
  selectedYear: string | null = null;
  currentYear: number = new Date().getFullYear();
  nextYear = this.currentYear + 1;
  HideCheckbox = true;
  HidePagination = true;

  statCard: IStartCard[] = [
    {
      title: 'Supervisors',
      count: 0,
      iconSrc: 'assets/lectures.svg',
      navigateTo: '/admin/supervisors',
      show: true,
    },
    {
      title: 'Students',
      count: 0,
      iconSrc: 'assets/students.svg',
      navigateTo: '/admin/students',
      show: true,
    },
    {
      title: 'Attachment',
      count: 0,
      iconSrc: 'assets/interns.svg',
      navigateTo: '/admin/attachment',
      show: true,
    },
  ];

  columns: TableColumn[] = [
    {
      label: 'Company Name',
      key: 'companyName',
    },
    {
      label: 'Supervisor Name',
      key: 'companySupervisor',
    },
    {
      label: 'Supervisor Phone',
      key: 'supervisorPhone',
    },
    {
      label: 'Exact Location',
      key: 'companyExactLocation',
    },
    {
      label: 'Date Commenced',
      key: 'dateCommenced',
    },
    {
      label: 'Last Updated',
      key: 'dateUpdated',
    },
  ];

  readonly userStore = inject(UserStore);
  private globalStore = inject(GlobalVariablesStore);

  public username = computed(() => this.userStore.firstName());

  private _dashboardService = inject(DashboardService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.populateYears();
  }

  ngOnInit() {
    this.updateCountsFromApiResponse(this.analyticsQuery.data()!);
  }

  isChildRouteActive(): boolean {
    return this._activatedRoute.firstChild !== null;
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

  updateCountsFromApiResponse(data: IStartAnalytics) {
    this.statCard = this.statCard.map((card) => {
      switch (card.title) {
        case 'Supervisors':
          return { ...card, count: data?.lectures };
        case 'Students':
          return { ...card, count: data?.students };
        case 'Attachment':
          return { ...card, count: data?.internships };
        default:
          return card;
      }
    });
  }

  studentAssumptionOfDutyLogsQuery = injectQuery(() => ({
    queryKey: [
      ...studentAssumptionOfDutyLogsQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear() ?? this.currentYear,
        this.globalStore.endYear() ?? this.nextYear,
        this.globalStore.semester()
      ),
    ],
    queryFn: async () => {
      const response = await this._dashboardService.getAssumptionOfDutyLogs();

      // Map the response data to match the columns
      return response.data.map((log) => ({
        id: log.id,
        companyName: log.companyDetails?.companyName ?? 'N/A',
        companySupervisor: log.companyDetails?.companySupervisor ?? 'N/A',
        supervisorPhone: log.companyDetails?.supervisorPhone ?? 'N/A',
        companyExactLocation: log.companyDetails?.companyExactLocation ?? 'N/A',
        dateCommenced: log.dateCommenced
          ? new Date(log.dateCommenced).toLocaleDateString()
          : 'N/A',
        dateUpdated: log.dateUpdated
          ? new Date(log.dateUpdated).toLocaleDateString()
          : 'N/A',
      }));
    },
  }));

  handleOnRowClicked(rowData: any) {
    this._router.navigate(
      [this.userStore.role().toLowerCase(), 'dashboard', 'duty-details'],
      {
        queryParams: {
          id: rowData.id,
        },
      }
    );
  }
}
