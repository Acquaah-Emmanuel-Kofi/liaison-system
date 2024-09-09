import { formatDate } from '@angular/common';

export function formatDateToDDMMYYYY(date: string): string {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return date; // Return original if invalid date
  return formatDate(parsedDate, 'dd/MM/yyyy', 'en-US'); // Format date
}
