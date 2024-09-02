import { INavLinks } from "../components/sidebar/sidebar.interface";

export const ADMIN_NAVLINKS: INavLinks[] = [
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
