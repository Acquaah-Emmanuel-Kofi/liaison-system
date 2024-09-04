export const getFirstTwoInitials = (name: string) => {
  return name
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('');
};

/**
 * This method is used to sort arrays either by ascending or descending order
 * @param data takes the array to sort
 * @param columnKey is the key to sort the data by
 * @param sortOrder is the order to sort
 */
export const sortByKey = <T extends Record<string, any>>(
  data: T[],
  columnKey: keyof T,
  sortOrder: 'asc' | 'desc'
): void => {
  data.sort((a, b) => {
    const valueA = String(a[columnKey]).toLowerCase();
    const valueB = String(b[columnKey]).toLowerCase();

    if (sortOrder === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
};

const routeValueKey: { [key: string]: string } = {
  dashboard: 'Dashboard',
  lecturers: 'Lecturers',
  students: 'Students',
  internships: 'Internships',
  'access-control': 'Access Control',
  courses: 'Courses',
  Location: 'Location',
  Annoucements: 'Annoucements',
};

export function setPageHeader(currentRoute: string): string {
  for (const key in routeValueKey) {
    if (currentRoute.includes(key)) {
      return routeValueKey[key];
    }
  }
  return '';
}
