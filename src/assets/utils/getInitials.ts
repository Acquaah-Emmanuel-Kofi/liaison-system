export function getFirstAndLastInitial(name: string| undefined): string {
  if (!name || name.trim().length === 0) {
    return '';
  }

  const nameParts = name.trim().split(/\s+/); // Split name by whitespace
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
}
