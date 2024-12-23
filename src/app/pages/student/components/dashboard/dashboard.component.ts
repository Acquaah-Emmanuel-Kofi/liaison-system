import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { UserStore } from '../../../../shared/store/user.store';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import {
  IStartCard,
  NameValue,
} from '../../../../shared/interfaces/constants.interface';
import { CardModule } from 'primeng/card';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { assignedLecturer } from '../../interfaces/dashboard.interface';
import { getFirstAndLastInitial } from '../../../../../assets/utils/getInitials';
import { IStatAnalytics } from '../../../../shared/interfaces/response.interface';
import { studentForLectureQuery } from '../../../../shared/helpers/query-keys.helper';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { getYears } from '../../../../shared/helpers/functions.helper';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SemesterOptions } from '../../../../shared/helpers/constants.helper';

@Component({
  selector: 'liaison-dashboard',
  standalone: true,
  imports: [
    StatCardComponent,
    CardModule,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly userStore = inject(UserStore);
  private globalStore = inject(GlobalVariablesStore);

  private cdr = inject(ChangeDetectorRef);
  dashboardService = inject(DashboardService);

  student: any;
  zoneLead: assignedLecturer | null = null;
  otherLecturers: assignedLecturer[] = [];
  lecturers: assignedLecturer[] = [];
  zoneSupervisorsCount: number = 0;

  semesterOptions: NameValue[] = SemesterOptions;
  selectedSemester: string | null = null;

  years: NameValue[] = [];
  selectedYear: string | null = null;
  currentYear: number = new Date().getFullYear();
  nextYear = this.currentYear + 1;

  public username = computed(() => this.userStore.firstName());

  statCard: IStartCard[] = [
    {
      title: 'Colleague Students',
      count: 0,
      iconSrc: 'assets/students.svg',
      navigateTo: '/student/supervision',
      show: true,
    },
    {
      title: 'Assumed Duties',
      count: 0,
      iconSrc: 'assets/interns.svg',
      navigateTo: '/admin/internships',
      show: false,
    },
    {
      title: 'Zone Supervisors',
      count: this.zoneSupervisorsCount,
      iconSrc: 'assets/lectures.svg',
      navigateTo: '/admin/internships',
      show: false,
    },
  ];

  constructor() {
    this.populateYears();
  }

  protected readonly getFirstAndLastInitial = getFirstAndLastInitial;

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

  dashboardQUery = injectQuery(() => ({
    queryKey: [
      ...studentForLectureQuery.data(
        this.globalStore.type(),
        this.globalStore.startYear() ?? this.currentYear,
        this.globalStore.endYear() ?? this.nextYear,
        this.globalStore.semester()
      ),
    ],
    queryFn: async () => {
      const response = await this.dashboardService.getDashboardInfo();
      this.updateCountsFromApiResponse(
        response.data,
        response.data.totalAssumedDuties
      );

      this.student = response.data;
      this.lecturers = response.data.assignedLecturers;

      this.otherLecturers = this.lecturers.filter(
        (lecturer) => lecturer.isZoneLead !== true
      );
      this.zoneLead =
        this.lecturers.find((lecturer) => lecturer.isZoneLead === true) || null;
      this.zoneSupervisorsCount = this.lecturers.length;
      this.cdr.detectChanges();
      return response.data;
    },
  }));

  updateCountsFromApiResponse(data: IStatAnalytics, totalAssumedDuties: number) {
    this.statCard = this.statCard.map((card) => {
      switch (card.title) {
        case 'Colleague Students':
          return { ...card, count: data.totalColleagues };
        case 'Assumed Duties':
          return { ...card, count: totalAssumedDuties };
        case 'Zone Supervisors':
          return { ...card, count: data.totalLecturers };
        default:
          return card;
      }
    });
  }
}
