export const indexName = (tableName: string, columns: string[]) => {
  return `${tableName}_${columns.join("_")}_index`;
};
