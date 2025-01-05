import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { UploadStudentComponent } from './components/students/components/uploadStudent/upload-student.component';
import { LecturersComponent } from './components/lecturers/lecturers.component';
import { InternshipsComponent } from './components/internships/internships.component';
import { ZonesComponent } from './components/zones/zones.component';
import { ProfilePageComponent } from '../../shared/components/profile-page/profile-page.component';
import { StudentLocationComponent } from './components/internships/components/student-location/student-location.component';
import { ZoneDetailsComponent } from './components/zones/components/zone-details/zone-details.component';
import { DutyDetailsComponent } from './components/duty-details/duty-details.component';
import { UploadDutyComponent } from './components/internships/components/upload-duty/upload-duty.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'duty-details',
        component: DutyDetailsComponent,
      },
    ],
  },
  {
    path: 'students',
    component: StudentsComponent,
    children: [
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full',
      },
      {
        path: 'upload',
        component: UploadStudentComponent,
      },
    ],
  },
  {
    path: 'lecturers',
    component: LecturersComponent,
  },
  {
    path: 'attachment',
    component: InternshipsComponent,
    children: [
      {
        path: '',
        redirectTo: 'attachment',
        pathMatch: 'full',
      },
      {
        path: 'location',
        component: StudentLocationComponent,
      },
      {
        path: 'upload',
        component: UploadDutyComponent,
      },
    ],
  },
  {
    path: 'zones',
    component: ZonesComponent,
    children: [
      {
        path: '',
        redirectTo: 'zones',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: ZoneDetailsComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];
