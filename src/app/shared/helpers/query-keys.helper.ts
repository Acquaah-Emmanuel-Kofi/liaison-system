export const studentsQueryKey = {
  all: ['students'] as const,
  data: (currentPage?: number, totalData?: number) =>
    [...studentsQueryKey.all, 'all-students', currentPage, totalData] as const,
};

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
