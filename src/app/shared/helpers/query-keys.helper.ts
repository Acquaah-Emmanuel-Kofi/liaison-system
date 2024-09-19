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
