import {ChangeDetectorRef, Component, computed, inject, OnInit} from '@angular/core';
import {UserStore} from "../../../../shared/store/user.store";
import {GlobalVariablesStore} from "../../../../shared/store/global-variables.store";
import {StatCardComponent} from "../../../../shared/components/stat-card/stat-card.component";
import {IStartCard} from "../../../../shared/interfaces/constants.interface";
import {CardModule} from "primeng/card";
import {NgForOf, NgIf} from "@angular/common";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {dashboardQueryKey} from "../../../../shared/helpers/query-keys.helper";
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {assignedLecturer} from "../../interfaces/dashboard.interface";
import {getFirstAndLastInitial} from "../../../../../assets/utils/getInitials";

@Component({
  selector: 'liaison-dashboard',
  standalone: true,
  imports: [
    StatCardComponent,
    CardModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  readonly userStore = inject(UserStore);
  private globalStore = inject(GlobalVariablesStore);
  private cdr = inject(ChangeDetectorRef);
  dashboardService = inject(DashboardService);

  student : any;
  zoneLead: assignedLecturer | null = null;
  otherLecturers: assignedLecturer[] = [];
  lecturers: assignedLecturer[] = [];
  username!: string;
  zoneSupervisorsCount:number = 0;

  statCard: IStartCard[] = [
    {
      title: 'Colleague Students',
      count: 0,
      iconSrc: 'assets/students.svg',
      navigateTo: '/lecturer/students',
      show: false
    },
    {
      title: 'Industries',
      count: 0,
      iconSrc: 'assets/interns.svg',
      navigateTo: '/admin/internships',
      show: false
    },
    {
      title: 'Zone Supervisors',
      count: this.zoneSupervisorsCount,
      iconSrc: 'assets/lectures.svg',
      navigateTo: '/admin/internships',
      show: false
    },
  ];


  ngOnInit() {
  }

  dashboardQUery = injectQuery(()=> ({
    queryKey: [dashboardQueryKey],
    queryFn: async ()=>{
      const response = await this.dashboardService.getDashboardInfo()
      this.username = response.data.name;
      this.student = response.data;
      this.lecturers = response.data.assignedLecturers;

      this.otherLecturers = this.lecturers.filter((lecturer) => lecturer.role !== 'Zone Lead');
      this.zoneLead = this.lecturers.find((lecturer) => lecturer.role === 'Zone Lead') || null;
      this.zoneSupervisorsCount = this.lecturers.length
      console.log(this.zoneSupervisorsCount)
      this.cdr.detectChanges()
      console.log(response.data);
      return response.data;
    }
    })

  );


  protected readonly getFirstAndLastInitial = getFirstAndLastInitial;
}
