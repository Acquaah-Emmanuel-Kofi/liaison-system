import { Routes } from "@angular/router";
import { LocationComponent } from "./components/location/location.component";
import { StudentsComponent } from "./components/students/students.component";

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
  }
];