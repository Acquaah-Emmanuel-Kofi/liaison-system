import {Routes} from '@angular/router';
import {AdminDashboardComponent} from './pages/admin/components/admin-dashboard/admin-dashboard.component';
import {AdminComponent} from './pages/admin/admin.component';
import {UploadComponent} from './pages/admin/components/upload/upload.component';
import {StudentsComponent} from './pages/admin/components/students/students.component';
import {LecturersComponent} from './pages/admin/components/lecturers/lecturers.component';
import {InternshipsComponent} from './pages/admin/components/internships/internships.component';
import { UploadStudentComponent } from './pages/admin/components/students/components/uploadStudent/upload-student/upload-student.component';
import {LoginComponent} from './pages/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'student-upload',
        component: UploadStudentComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
        children:[
          {
            path:'upload',
            component:UploadStudentComponent
          }
        ]
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
