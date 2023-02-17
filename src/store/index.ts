import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { getSchema, postSchema } from '../api/schema';
import { deserializeSchema, getPlural, serializeSchema } from '../utils/common';
import { Column, ErectusStore, ForeignKey, Index, Table, TableItem, UpdateTablesAction } from './types';

export const useStore = create<ErectusStore>()((set, get) => ({
  tables: [],
  currentTable: null,

  fetchSchema: async () => {
    try {
      const response = await getSchema();
      // const response = apiResponse;

      if (response.data.data) set({ tables: serializeSchema(response.data.data) });
    } catch (err: any) {
      toast.error(err.message);
    }
  },
  updateSchema: async () => {
    const { tables } = get();

    try {
      const jsonSchema = deserializeSchema(tables);
      // console.log(jsonSchema);
      await postSchema(jsonSchema);
    } catch (err: any) {
      toast.error(err.message);
    }
  },

  addTable: (newTable: Table) => set({ tables: [...get().tables, newTable] }),
  deleteTable: (tableName: string) => set({ tables: get().tables.filter((table) => table.name !== tableName) }),
  setCurrentTable: (tableName: string) => set({ currentTable: get().tables.find((table) => table.name === tableName) }),

  addColumn: (column: Column) => {
    const { updateTables } = get();

    updateTables({ action: UpdateTablesAction.Add, objectKey: 'column', item: column });
  },
  editColumn: (columnName: string, newColumn: Column) => {
    const { updateTables } = get();

    updateTables({
      action: UpdateTablesAction.Edit,
      objectKey: 'column',
      itemName: columnName,
      item: newColumn,
    });
  },
  deleteColumn: (columnName: string) => {
    const { updateTables } = get();

    updateTables({ action: UpdateTablesAction.Delete, objectKey: 'column', itemName: columnName });
  },

  addIndex: (index: Index) => {
    const { updateTables } = get();

    updateTables({ action: UpdateTablesAction.Add, objectKey: 'index', item: index });
  },
  editIndex: (indexName: string, newIndex: Index) => {
    const { updateTables } = get();

    updateTables({
      action: UpdateTablesAction.Edit,
      objectKey: 'index',
      itemName: indexName,
      item: newIndex,
    });
  },
  deleteIndex: (indexName: string) => {
    const { updateTables } = get();

    updateTables({ action: UpdateTablesAction.Delete, objectKey: 'index', itemName: indexName });
  },

  addForeignKey: (foreignKey: ForeignKey) => {
    const { updateTables } = get();

    updateTables({ action: UpdateTablesAction.Add, objectKey: 'foreignKey', item: foreignKey });
  },
  editForeignKey: (foreignKeyName: string, foreignKey: ForeignKey) => {
    const { updateTables } = get();

    updateTables({
      action: UpdateTablesAction.Edit,
      objectKey: 'foreignKey',
      itemName: foreignKeyName,
      item: foreignKey,
    });
  },
  deleteForeignKey: (foreignKeyName: string) => {
    const { updateTables } = get();

    updateTables({ action: UpdateTablesAction.Delete, objectKey: 'foreignKey', itemName: foreignKeyName });
  },

  updateTables: (values) => {
    const { tables, currentTable } = get();

    let updatedCurrentTable: Table;

    if (currentTable) {
      switch (values.action) {
        case UpdateTablesAction.Add: {
          updatedCurrentTable = {
            ...currentTable,
            [getPlural(values.objectKey)]: [...(currentTable?.[getPlural(values.objectKey)] ?? []), values.item],
          };
          break;
        }
        case UpdateTablesAction.Edit: {
          updatedCurrentTable = {
            ...currentTable,
            [getPlural(values.objectKey)]: currentTable[getPlural(values.objectKey)].map((item) => {
              if (item.name === values.itemName) {
                item = values.item!;
              }
              return item;
            }),
          };
          break;
        }
        case UpdateTablesAction.Delete:
        default: {
          updatedCurrentTable = {
            ...currentTable,
            [getPlural(values.objectKey)]: (currentTable[getPlural(values.objectKey)] as TableItem[]).filter(
              (item) => item.name !== values.itemName
            ),
          };
          break;
        }
      }

      const updatedTables = tables.map((table) => {
        if (table.name === updatedCurrentTable.name) {
          table = updatedCurrentTable;
        }
        return table;
      });

      set({ tables: updatedTables, currentTable: updatedCurrentTable });
    }
  },
}));
