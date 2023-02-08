import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getPlural } from '../utils/common';
import { Column, ErectusStore, ForeignKey, Index, Table, UpdateTablesAction } from './types';

export const useStore = create<ErectusStore>()(
  persist(
    (set, get) => ({
      tables: [],
      currentTable: null,

      addTable: (newTable: Table) => set({ tables: [...get().tables, newTable] }),
      deleteTable: (tableName: string) => set({ tables: get().tables.filter((table) => table.name !== tableName) }),
      setCurrentTable: (tableName: string) =>
        set({ currentTable: get().tables.find((table) => table.name === tableName) }),

      addColumn: (column: Column) => {
        const { updateTables } = get();

        updateTables({ action: UpdateTablesAction.Add, objectKey: 'column', value: column });
      },
      editColumn: (columnName: string, newColumn: Column) => {
        const { updateTables } = get();

        updateTables({
          action: UpdateTablesAction.Edit,
          objectKey: 'column',
          previousName: columnName,
          value: newColumn,
        });
      },
      deleteColumn: (columnName: string) => {
        const { updateTables } = get();

        updateTables({ action: UpdateTablesAction.Delete, objectKey: 'column', previousName: columnName });
      },

      addIndex: (index: Index) => {
        const { updateTables } = get();

        updateTables({ action: UpdateTablesAction.Add, objectKey: 'index', value: index });
      },
      editIndex: (indexName: string, newIndex: Index) => {
        const { updateTables } = get();

        updateTables({
          action: UpdateTablesAction.Edit,
          objectKey: 'index',
          previousName: indexName,
          value: newIndex,
        });
      },
      deleteIndex: (indexName: string) => {
        const { updateTables } = get();

        updateTables({ action: UpdateTablesAction.Delete, objectKey: 'index', previousName: indexName });
      },

      addForeignKey: (foreignKey: ForeignKey) => {
        const { updateTables } = get();

        updateTables({ action: UpdateTablesAction.Add, objectKey: 'foreignKey', value: foreignKey });
      },
      deleteForeignKey: (foreignKeyName: string) => {
        const { updateTables } = get();

        updateTables({ action: UpdateTablesAction.Delete, objectKey: 'foreignKey', previousName: foreignKeyName });
      },

      updateTables: (values) => {
        const { tables, currentTable } = get();

        let updatedCurrentTable: Table;

        if (currentTable) {
          switch (values.action) {
            case UpdateTablesAction.Add: {
              updatedCurrentTable = {
                ...currentTable,
                [getPlural(values.objectKey)]: [...(currentTable?.[getPlural(values.objectKey)] ?? []), values.value],
              };
              break;
            }
            case UpdateTablesAction.Edit: {
              updatedCurrentTable = {
                ...currentTable,
                [getPlural(values.objectKey)]: currentTable[getPlural(values.objectKey)].map((item) => {
                  if (item.name === values.previousName) {
                    item = values.value!;
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
                [getPlural(values.objectKey)]: (currentTable[getPlural(values.objectKey)] as any).filter(
                  (item: Column | Index | ForeignKey) => item.name !== values.previousName
                ) as any,
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
    }),
    {
      name: 'tables',
      partialize: (state) => ({ tables: state.tables }),
    }
  )
);
