import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import {UploadComponent} from "./pages/admin/components/upload/upload.component";

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
        path:'upload',
        component: UploadComponent,
      }
    ],
  },
];
