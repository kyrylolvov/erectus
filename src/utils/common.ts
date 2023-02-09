import { Schema } from '../api/schema';
import { Table } from '../store/types';

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

export const serializeSchema = (schema: Schema): Table[] => {
  const tables = Object.keys(schema.tables).map((tableName) => {
    const { columns, indexes, foreignKeys } = schema.tables[tableName];

    return {
      name: tableName,
      columns: Object.keys(columns).map((columnName) => columns[columnName]),
      indexes: Object.keys(indexes).map((indexName) => indexes[indexName]),
      foreignKeys: Object.keys(foreignKeys).map((foreignKeyName) => foreignKeys[foreignKeyName]),
    };
  });

  // Remove column length from varchar type, since it's not supported yet
  tables.map((table) =>
    table.columns.map((column) => {
      if (column.type.includes('varchar')) {
        column.type = 'varchar';
      }
      return column;
    })
  );

  return tables;
};

export const deserializeSchema = (tables: Table[]): Schema => {
  const mappedTables = tables.map((table) => {
    const mappedColumns = table.columns.map((column) => ({
      [column.name]: {
        name: column.name,
        type: column.type,
        primaryKey: column.primaryKey,
        notNull: column.notNull,
      },
    }));

    const mappedIndexes = table.indexes.map((index) => ({
      [index.name]: {
        name: index.name,
        columns: index.columns,
        isUnique: index.isUnique,
      },
    }));

    const mappedForeignKeys = table.foreignKeys.map((foreignKey) => ({
      [foreignKey.name]: {
        name: foreignKey.name,
        tableFrom: foreignKey.tableFrom,
        tableTo: foreignKey.tableTo,
        columnsFrom: foreignKey.columnsFrom,
        columnsTo: foreignKey.columnsTo,
        onDelete: foreignKey.onDelete,
        onUpdate: foreignKey.onUpdate,
      },
    }));

    return {
      [table.name]: {
        name: table.name,
        schema: 'my_schema',
        columns: Object.assign({}, ...mappedColumns),
        indexes: Object.assign({}, ...mappedIndexes),
        foreignKeys: Object.assign({}, ...mappedForeignKeys),
      },
    };
  });

  return {
    version: '4',
    dialect: 'pg',
    id: '8bdc419e-b3cc-4800-9d2b-180c94503885',
    prevId: '00000000-0000-0000-0000-000000000000',
    tables: Object.assign({}, ...mappedTables),
    enums: {},
    schemas: {
      my_schema: 'my_schema',
    },
  };
};
