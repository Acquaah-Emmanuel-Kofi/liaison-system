import { formatDate } from '@angular/common';

export const ACCESS_TOKEN_KEY: string = 'LIAISON_SYSTEM_TOKEN';

export const saveToLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

const routeValueKey: { [key: string]: string } = {
  dashboard: 'Dashboard',
  lecturers: 'Lecturers',
  students: 'Students',
  internships: 'Internships',
  'access-control': 'Access Control',
  courses: 'Courses',
  location: 'Location',
  annoucements: 'Annoucements',
  zones: 'Zones',
};

export function setPageHeader(currentRoute: string): string {
  for (const key in routeValueKey) {
    if (currentRoute.includes(key)) {
      return routeValueKey[key];
    }
  }
  return '';
}
