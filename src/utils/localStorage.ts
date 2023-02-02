export type GenericObject = { [key: string]: any };

export const loadTables = () => {
  try {
    const serializedState = localStorage.getItem('tables');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveTables = (state: GenericObject) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tables', serializedState);
  } catch (err) {
    console.log(err);
  }
};
