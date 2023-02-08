export const getPlural = (value: 'column' | 'index' | 'foreignKey') => {
  switch (value) {
    case 'column':
      return 'columns';
    case 'index':
      return 'indexes';
    case 'foreignKey':
    default:
      return 'foreignKeys';
  }
};
