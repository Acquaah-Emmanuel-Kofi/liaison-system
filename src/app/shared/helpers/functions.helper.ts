import { formatDate } from '@angular/common';

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
  data?.sort((a, b) => {
    const valueA = String(a[columnKey]).toLowerCase();
    const valueB = String(b[columnKey]).toLowerCase();

    if (sortOrder === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
};

export const formatDateToDDMMYYYY = (date: string): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return date; // Return original if invalid date
  return formatDate(parsedDate, 'dd/MM/yyyy', 'en-US'); // Format date
};

export function searchArray<T>(
  array: T[],
  searchTerm: string,
  keys: (keyof T)[]
): T[] {
  return array?.filter((item) =>
    keys?.some((key) =>
      item[key]
        ?.toString()
        ?.toLowerCase()
        ?.trim()
        ?.includes(searchTerm?.toLowerCase()?.trim())
    )
  );
}

export const getYears = (
  range: string
): { startYear: number; endYear: number } | null => {
  const years = range.split('/');

  if (
    years.length === 2 &&
    !isNaN(Number(years[0])) &&
    !isNaN(Number(years[1]))
  ) {
    return {
      startYear: Number(years[0]),
      endYear: Number(years[1]),
    };
  } else {
    return null;
  }
};


export const filterLecturers = (
  lecturers: any[],
  faculty: string,
  department: string
) => {
  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

  let filteredLecturers = lecturers;

  if (faculty) {
    const normalizedFaculty = normalize(faculty);
    filteredLecturers = filteredLecturers.filter(
      (lecturer) => normalize(lecturer.faculty) === normalizedFaculty
    );
  }

  if (department) {
    const normalizedDepartment = normalize(department);
    filteredLecturers = filteredLecturers.filter(
      (lecturer) => normalize(lecturer.department) === normalizedDepartment
    );
  }

  return filteredLecturers;
};
