import { Routes } from '@angular/router';
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";
import {AdminDashboardComponent} from "./pages/admin-dashboard/admin-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {

    path:"admin-page",
    component: AdminLayoutComponent,
    children:[
      {
        path:"dashboard",
        component: AdminDashboardComponent
      }
    ]

  }

];
