import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssumptionOfDutyComponent } from './components/assumption-of-duty/assumption-of-duty.component';

export const studentRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'assumption-of-duty',
    component: AssumptionOfDutyComponent,
  },
];
