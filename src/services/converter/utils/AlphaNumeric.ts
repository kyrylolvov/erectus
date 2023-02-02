export const isAlphaNumeric = (str: string): boolean => {
  if (!str) return false;
  return !!str.match(/^[0-9a-zA-Z_]+$/);
};
