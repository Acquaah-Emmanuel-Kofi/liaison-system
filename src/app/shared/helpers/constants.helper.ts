export const getFirstTwoInitials = (name: string) => {
  return name
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('');
};
