export const isFirstLetter = (str: string): boolean => {
  if (!str || !str.length) return false;
  return !!str.charAt(0).match(/[a-z]/i);
}
