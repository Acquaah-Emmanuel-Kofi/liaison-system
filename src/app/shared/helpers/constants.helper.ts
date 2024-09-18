import { formatDate } from "@angular/common";

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


export const formatDateToDDMMYYYY = (date: string): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return date; // Return original if invalid date
  return formatDate(parsedDate, 'dd/MM/yyyy', 'en-US'); // Format date
}

export function searchArray<T>(array: T[], searchTerm: string, keys: (keyof T)[]): T[] {
  return array.filter(item =>
    keys?.some(key => 
      item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}