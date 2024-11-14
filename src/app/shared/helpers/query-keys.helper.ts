import {Observable} from "rxjs";

export const studentsQueryKey = {
  all: ['students'] as const,
  data: (startOfAcademicYear:number,endOfAcademicYear:number,internship:boolean,page?: number, size?: number) =>
    [...studentsQueryKey.all, 'all-students'] as const,
};


export const zonesQueryData = {
  all: ['zones'] as const,
  data: (startOfAcademicYear?: any, endOfAcademicYear?: any, internship?: boolean)=>
    [
      ...zonesQueryData.all,
      startOfAcademicYear,
      endOfAcademicYear,
      internship,
  ]
}

export const lecturersQueryKey = {
  all: ['lecturers'] as const,
  data: (currentPage: number, totalData: number) =>
    [
      ...lecturersQueryKey.all,
      'all-lecturers',
      currentPage,
      totalData,
    ] as const,
};

export const lecturerListQueryKey = {
  all: ['Lecturers list'] as const,
  data: () => [...lecturerListQueryKey.all, 'list'] as const,
};

export const statAnalyticsQueryKey = {
  all: ['stat analytics'] as const,
  data: (internshipType: string, startYear: number, endYear: number) =>
    [
      ...statAnalyticsQueryKey.all,
      'all-stats',
      internshipType,
      startYear,
      endYear,
    ] as const,
};
