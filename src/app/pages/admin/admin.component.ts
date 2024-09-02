import { Component, signal } from '@angular/core';
import { INavLinks } from '../../shared/components/sidebar/sidebar.interface';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'liaison-admin',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  isSidebarVisible = signal<boolean>(false);

  links: INavLinks[] = [
    {
      title: 'Dashboard',
      defaultIconSrc: '/assets/icons/dashboard.svg',
      routerLink: '/admin/dashboard',
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
