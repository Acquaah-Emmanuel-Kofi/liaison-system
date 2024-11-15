import { INavLinks } from '../components/sidebar/sidebar.interface';

export const ADMIN_NAVLINKS: INavLinks[] = [
  {
    title: 'Dashboard',
    defaultIconSrc: '/assets/icons/dashboard.svg',
    routerLink: 'dashboard',
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

export const LECTURER_NAVLINKS: INavLinks[] = [
  {
    title: 'Dashboard',
    defaultIconSrc: '/assets/icons/dashboard.svg',
    routerLink: 'dashboard',
  },
  // {
  //   title: 'Courses',
  //   defaultIconSrc: '/assets/icons/courses.svg',
  //   routerLink: 'courses',
  // },
  {
    title: 'Students',
    defaultIconSrc: '/assets/icons/students.svg',
    routerLink: 'students',
  },
  // {
  //   title: 'Internships',
  //   defaultIconSrc: '/assets/icons/internships.svg',
  //   routerLink: 'internships',
  // },
  {
    title: 'Location',
    defaultIconSrc: '/assets/icons/location.svg',
    routerLink: 'location',
  },
];
