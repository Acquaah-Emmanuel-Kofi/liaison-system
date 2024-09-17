export const studentsQueryKey = {
  all: ['students'] as const,
  data: () => [...studentsQueryKey.all, 'all-students'] as const,
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
