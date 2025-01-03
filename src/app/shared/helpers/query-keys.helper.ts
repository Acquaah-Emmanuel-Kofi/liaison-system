export const studentsQueryKey = {
  all: ['students'] as const,
  data: (
    startOfAcademicYear: number,
    endOfAcademicYear: number,
    internship: boolean,
    semester: number,
    page?: number,
    size?: number
  ) =>
    [
      ...studentsQueryKey.all,
      'all-students',
      startOfAcademicYear,
      endOfAcademicYear,
      semester,
      internship,
      page,
      size,
    ] as const,
};

export const studentForLectureQuery = {
  all: ['lecturer students'] as const,
  data: (
    internshipType: boolean,
    startYear: number,
    endYear: number,
    semester: number
  ) =>
    [
      ...statAnalyticsQueryKey.all,
      'all-lecturer-students',
      startYear,
      endYear,
      semester,
      internshipType,
    ] as const,
};

export const zonesQueryData = {
  all: ['zones'] as const,
  details: () => [...zonesQueryData.all, 'details'] as const,
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
  assumption: (
    internshipType: boolean,
    startYear: number,
    endYear: number,
    semester: number
  ) =>
    [
      ...lecturerDashboardQueryKey.all,
      'assumption',
      startYear,
      endYear,
      semester,
      internshipType,
    ] as const,
  colleagues: (
    internshipType: boolean,
    startYear: number,
    endYear: number,
    semester: number
  ) =>
    [
      ...lecturerDashboardQueryKey.all,
      'colleagues',
      startYear,
      endYear,
      semester,
      internshipType,
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
  data: (
    internshipType: boolean,
    startYear: number,
    endYear: number,
    semester: number
  ) =>
    [
      ...statAnalyticsQueryKey.all,
      'all-stats',
      startYear,
      endYear,
      semester,
      internshipType,
    ] as const,
};

export const studentAssumptionOfDutyLogsQueryKey = {
  all: ['duty logs'] as const,
  details: () =>
    [...studentAssumptionOfDutyLogsQueryKey.all, 'details'] as const,
  data: (
    internshipType: boolean,
    startYear: number,
    endYear: number,
    semester: number
  ) =>
    [
      ...studentAssumptionOfDutyLogsQueryKey.all,
      'all-logs',
      startYear,
      endYear,
      semester,
      internshipType,
    ] as const,
};

export const studentsLocationQueryKey = {
  all: ['students location'] as const,
  data: (internshipType: boolean, startYear: number, endYear: number) =>
    [
      ...studentsLocationQueryKey.all,
      'all-students',
      startYear,
      endYear,
      internshipType,
    ] as const,
};

export const topIndustriesQueryKey = {
  all: ['top industries'] as const,
  data: (
    internshipType: boolean,
    startYear: number,
    endYear: number,
    semester: number
  ) =>
    [
      ...topIndustriesQueryKey.all,
      'all-industries',
      startYear,
      endYear,
      semester,
      internshipType,
    ] as const,
};

export const studentAndlecturerChartQueryKey = {
  all: ['chartData'] as const,
  data: (
    internshipType: boolean,
    startYear: number,
    endYear: number,
    semester: number
  ) =>
    [
      ...studentAndlecturerChartQueryKey.all,
      'all-chart',
      startYear,
      endYear,
      semester,
      internshipType,
    ] as const,
};
