export const studentsQueryKey = {
  all: ['students'] as const,
  data: (
    startOfAcademicYear: number,
    endOfAcademicYear: number,
    internship: boolean,
    page?: number,
    size?: number
  ) =>
    [
      ...studentsQueryKey.all,
      'all-students',
      startOfAcademicYear,
      endOfAcademicYear,
      internship,
      page,
      size,
    ] as const,
};

export const studentForLectureQuery = {
  all: ['students'] as const,
};

export const zonesQueryData = {
  all: ['zones'] as const,
  data: (
    startOfAcademicYear?: any,
    endOfAcademicYear?: any,
    internship?: boolean
  ) => [
    ...zonesQueryData.all,
    startOfAcademicYear,
    endOfAcademicYear,
    internship,
  ],
};
export const lecturerDashboardQueryKey = {
  all: ['lecturer dashboard'] as const,
  assumption: (internshipType: boolean, startYear: number, endYear: number) =>
    [
      ...lecturerDashboardQueryKey.all,
      'assumption',
      internshipType,
      startYear,
      endYear,
    ] as const,
  colleagues: (internshipType: boolean, startYear: number, endYear: number) =>
    [
      ...lecturerDashboardQueryKey.all,
      'colleagues',
      internshipType,
      startYear,
      endYear,
    ] as const,
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
  data: (internshipType: boolean, startYear: number, endYear: number) =>
    [
      ...statAnalyticsQueryKey.all,
      'all-stats',
      internshipType,
      startYear,
      endYear,
    ] as const,
};

export const studentAssumptionOfDutyLogsQueryKey = {
  all: ['duty logs'] as const,
  data: (internshipType: boolean, startYear: number, endYear: number) =>
    [
      ...studentAssumptionOfDutyLogsQueryKey.all,
      'all-logs',
      internshipType,
      startYear,
      endYear,
    ] as const,
};

export const studentsLocationQueryKey = {
  all: ['students location'] as const,
  data: (internshipType: boolean, startYear: number, endYear: number) =>
    [
      ...studentsLocationQueryKey.all,
      'all-students',
      internshipType,
      startYear,
      endYear,
    ] as const,
};

export const topIndustriesQueryKey = {
  all: ['top industries'] as const,
  data: (internshipType: boolean, startYear: number, endYear: number) =>
    [
      ...topIndustriesQueryKey.all,
      'all-industries',
      internshipType,
      startYear,
      endYear,
    ] as const,
};
