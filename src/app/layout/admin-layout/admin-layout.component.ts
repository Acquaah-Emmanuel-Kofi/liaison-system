import {Component, signal} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {INavLinks} from "../../shared/components/sidebar/sidebar.interface";

@Component({
  selector: 'liaison-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  isSidebarVisible = signal<boolean>(false);

  links: INavLinks[] = [
    {
      title: 'Dashboard',
      defaultIconSrc: '/assets/icons/dashboard.svg',
      routerLink: '/admin-page/dashboard',
    },
    {
      title: 'Lecturers',
      defaultIconSrc: '/assets/icons/lecturers.svg',
      routerLink: 'lecturers',
    },
    {
      title: 'Students',
      defaultIconSrc: '/assets/icons/students.svg',
      routerLink: 'students',
    },
    {
      title: 'Internships',
      defaultIconSrc: '/assets/icons/internships.svg',
      routerLink: 'internships',
    },
    {
      title: 'Access Control',
      defaultIconSrc: '/assets/icons/access_control.svg',
      routerLink: 'access-control',
    },
  ];

  public toggleSidebar() {
    this.isSidebarVisible.update((prev) => !prev);
  }



}
