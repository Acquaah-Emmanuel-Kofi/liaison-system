export const studentsQueryKey = {
  all: ['students'] as const,
  data: () => [...studentsQueryKey.all, 'all-students'] as const,
};

export const lecturersQueryKey = {
  all: ['lecturers'] as const,
  data: () => [...lecturersQueryKey.all, 'all-lecturers'] as const,
};
