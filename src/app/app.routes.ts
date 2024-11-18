import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ErrorPageComponent } from './pages/404/error-page/error-page.component';
import { authGuard } from './guards/auth/auth.guard';
import { roleGuard } from './guards/role/role.guard';
import { guestGuard } from './guards/guest/guest.guard';
// import { LecturerComponent } from './pages/lecturer/lecturer.component';
import { StudentComponent } from './pages/student/student.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () =>
      import('../app/pages/admin/admin.routes').then(
        (routes) => routes.adminRoutes
      ),
    canActivate: [authGuard, roleGuard],
    
  },
  // {
  //   path: 'lecturer',
  //   component: LecturerComponent,
  //   loadChildren: () =>
  //     import('../app/pages/lecturer/lecturer.routes').then(
  //       (routes) => routes.lecturerRoutes
  //     ),
  //   canActivate: [authGuard, roleGuard],
  // },
  {
    path: 'student',
    component: StudentComponent,
    loadChildren: () =>
      import('../app/pages/student/student.routes').then(
        (routes) => routes.studentRoutes
      ),
    canActivate: [authGuard, roleGuard],
    
  },
 
  {
    path: 'profile',
    component: AdminComponent,  
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ProfilePageComponent,  
      },
    ],
  },
  
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
