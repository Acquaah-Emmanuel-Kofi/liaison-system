import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ErrorPageComponent } from './pages/404/error-page/error-page.component';
import { authGuard } from './guards/auth/auth.guard';
import { roleGuard } from './guards/role/role.guard';

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
    loadChildren: () =>
      import('../app/pages/admin/admin.routes').then(
        (routes) => routes.adminRoutes
      ),
    canActivate: [authGuard, roleGuard],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
