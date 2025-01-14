import { Routes } from '@angular/router';
import { LocationComponent } from './components/location/location.component';
import { StudentsComponent } from './components/students/students.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilePageComponent } from '../../shared/components/profile-page/profile-page.component';
import { SupervisorColleaguesComponent } from './components/supervisor-colleagues/supervisor-colleagues.component';

export const lecturerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'location',
    component: LocationComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'supervisors',
    component: SupervisorColleaguesComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];
