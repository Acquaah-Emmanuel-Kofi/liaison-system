import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { UserStore } from '../../../../shared/store/user.store';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { IStartCard } from '../../../../shared/interfaces/constants.interface';
import { CardModule } from 'primeng/card';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { assignedLecturer } from '../../interfaces/dashboard.interface';
import { getFirstAndLastInitial } from '../../../../../assets/utils/getInitials';
import { IStatAnalytics } from '../../../../shared/interfaces/response.interface';
import { lecturerDashboardQueryKey } from '../../../../shared/helpers/query-keys.helper';

@Component({
  selector: 'liaison-dashboard',
  standalone: true,
  imports: [StatCardComponent, CardModule, NgForOf, NgIf, NgOptimizedImage],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly userStore = inject(UserStore);
  private cdr = inject(ChangeDetectorRef);
  dashboardService = inject(DashboardService);

  student: any;
  zoneLead: assignedLecturer | null = null;
  otherLecturers: assignedLecturer[] = [];
  lecturers: assignedLecturer[] = [];
  zoneSupervisorsCount: number = 0;

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
      title: 'Industries',
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

  dashboardQUery = injectQuery(() => ({
    queryKey: [...lecturerDashboardQueryKey.all],
    queryFn: async () => {
      const response = await this.dashboardService.getDashboardInfo();
      this.updateCountsFromApiResponse(response.data);
      this.student = response.data;
      this.lecturers = response.data.assignedLecturers;

      this.otherLecturers = this.lecturers.filter(
        (lecturer) => lecturer.isZoneLead === false
      );
      this.zoneLead =
        this.lecturers.find((lecturer) => lecturer.isZoneLead === true) || null;
      this.zoneSupervisorsCount = this.lecturers.length;
      this.cdr.detectChanges();
      return response.data;
    },
  }));

  updateCountsFromApiResponse(data: IStatAnalytics) {
    this.statCard = this.statCard.map((card) => {
      switch (card.title) {
        case 'Colleague Students':
          return { ...card, count: data.totalColleagues };
        case 'Industries':
          return { ...card, count: data.totalLecturers };
        case 'Zone Supervisors':
          return { ...card, count: data.totalLecturers };
        default:
          return card;
      }
    });
  }

  protected readonly getFirstAndLastInitial = getFirstAndLastInitial;
}
