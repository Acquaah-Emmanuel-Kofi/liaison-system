import { INavLinks } from '../components/sidebar/sidebar.interface';

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
    routerLink: '/admin/students',
  },
  {
    title: 'Internships',
    defaultIconSrc: '/assets/icons/internships.svg',
    routerLink: 'internships',
  },
  {
    title: 'Zones',
    defaultIconSrc: '/assets/icons/zones.svg',
    routerLink: 'zones',
    // children: [
    //   {
    //     title: 'Zones',
    //     defaultIconSrc: '/assets/icons/zones.svg',
    //     routerLink: 'zones',
    //   },
      // {
      //   title: 'Notification Settings',
      //   defaultIconSrc: '/assets/icons/notifications.svg',
      //   routerLink: 'notification-settings',
      // },
    // ],
  }
];
