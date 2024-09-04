export const getFirstTwoInitials = (name: string) => {
  return name
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('');
};

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

