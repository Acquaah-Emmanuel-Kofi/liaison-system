import {Component, computed, inject} from '@angular/core';
import {UserStore} from "../../../../shared/store/user.store";
import {GlobalVariablesStore} from "../../../../shared/store/global-variables.store";
import {StatCardComponent} from "../../../../shared/components/stat-card/stat-card.component";
import {IStartCard} from "../../../../shared/interfaces/constants.interface";

@Component({
  selector: 'liaison-dashboard',
  standalone: true,
  imports: [
    StatCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly userStore = inject(UserStore);
  private globalStore = inject(GlobalVariablesStore);

  public username = computed(() => this.userStore.firstName());
  statCard: IStartCard[] = [
    {
      title: 'Colleague Students',
      count: 0,
      iconSrc: 'assets/students.svg',
      navigateTo: '/lecturer/students',
      show: true
    },
    {
      title: 'Industries',
      count: 0,
      iconSrc: 'assets/interns.svg',
      navigateTo: '/admin/internships',
      show: true
    },
    {
      title: 'Zone Supervisors',
      count: 0,
      iconSrc: 'assets/lectures.svg',
      navigateTo: '/admin/internships',
      show: true
    },
  ];




}
