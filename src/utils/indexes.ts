/* eslint-disable no-plusplus */
export const arraysEqual = (firstArray: string[], secondArray: string[]) => {
  const a = firstArray.sort();
  const b = secondArray.sort();

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
