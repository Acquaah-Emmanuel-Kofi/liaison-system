export const studentsQueryKey = {
  all: ['students'] as const,
  data: () => [...studentsQueryKey.all, 'all-students'] as const,
};
