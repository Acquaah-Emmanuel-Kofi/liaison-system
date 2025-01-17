import { INavLinks } from '../components/sidebar/sidebar.interface';

export const ADMIN_NAVLINKS: INavLinks[] = [
  {
    title: 'Dashboard',
    defaultIconSrc: '/assets/icons/dashboard.svg',
    routerLink: 'dashboard',
  },
  {
    title: 'Supervisors',
    defaultIconSrc: '/assets/icons/lecturers.svg',
    routerLink: 'supervisors',
  },
  {
    title: 'Students',
    defaultIconSrc: '/assets/icons/students.svg',
    routerLink: 'students',
  },
  {
    title: 'Attachment',
    defaultIconSrc: '/assets/icons/internships.svg',
    routerLink: 'attachment',
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
  },
];

export const LECTURER_NAVLINKS: INavLinks[] = [
  {
    title: 'Dashboard',
    defaultIconSrc: '/assets/icons/dashboard.svg',
    routerLink: 'dashboard',
  },
  {
    title: 'Students',
    defaultIconSrc: '/assets/icons/students.svg',
    routerLink: 'students',
  },
  {
    title: 'Location',
    defaultIconSrc: '/assets/icons/location.svg',
    routerLink: 'location',
  }
];

export const STUDENT_NAVLINKS: INavLinks[] = [
  {
    title: 'Dashboard',
    defaultIconSrc: '/assets/icons/dashboard.svg',
    routerLink: 'dashboard',
  },
  {
    title: 'Assumption of duty',
    defaultIconSrc: '/assets/icons/book.svg',
    routerLink: 'assumption-of-duty',
  },
  {
    title: 'Colleague Information',
    defaultIconSrc: '/assets/icons/supervise.svg',
    routerLink: 'supervision',
  },
];
