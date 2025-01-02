import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { UploadComponent } from "./components/upload/upload.component";
import { StudentsComponent } from "./components/students/students.component";
import { UploadStudentComponent } from "./components/students/components/uploadStudent/upload-student/upload-student.component";
import { LecturersComponent } from "./components/lecturers/lecturers.component";
import { InternshipsComponent } from "./components/internships/internships.component";
import { ZonesComponent } from "./components/zones/zones.component";
import { ProfilePageComponent } from "../../shared/components/profile-page/profile-page.component";
import { StudentLocationComponent } from "./components/students/components/student-location/student-location.component";
import { ZoneDetailsComponent } from "./components/zones/components/zone-details/zone-details.component";
import { DutyDetailsComponent } from "./components/duty-details/duty-details.component";

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
      {
        path: 'location',
        component: StudentLocationComponent,
      },
    ],
  },
  {
    path: 'lecturers',
    component: LecturersComponent,
  },
  {
    path: 'internships',
    component: InternshipsComponent,
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