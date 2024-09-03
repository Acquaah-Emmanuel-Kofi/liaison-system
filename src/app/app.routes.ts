import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UploadComponent } from './pages/admin/components/upload/upload.component';
import { StudentsComponent } from './pages/admin/components/students/students.component';
import { LecturersComponent } from './pages/admin/components/lecturers/lecturers.component';
import { InternshipsComponent } from './pages/admin/components/internships/internships.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'lecturers',
        component: LecturersComponent,
      },
      {
        path: 'internships',
        component: InternshipsComponent,
      },
    ],
  },
];
