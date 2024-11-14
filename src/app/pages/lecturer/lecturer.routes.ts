import { Routes } from "@angular/router";
import { LocationComponent } from "./components/location/location.component";

export const lecturerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'location',
    component: LocationComponent,
  }
];