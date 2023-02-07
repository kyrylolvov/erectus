import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Column, ErectusStore, ForeignKey, Index, Table } from './types';

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
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = { ...currentTable, columns: [...(currentTable?.columns ?? []), column] };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table = updatedCurrentTable;
            }
            return table;
          });

          set({ tables: updatedTables, currentTable: updatedCurrentTable });
        }
      },
      editColumn: (columnName: string, newColumn: Column) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = {
            ...currentTable,
            columns: currentTable.columns.map((column) => {
              if (column.name === columnName) {
                column = newColumn;
              }
              return column;
            }),
          };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table = updatedCurrentTable;
            }
            return table;
          });

          set({ tables: updatedTables, currentTable: updatedCurrentTable });
        }
      },
      deleteColumn: (columnName: string) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = {
            ...currentTable,
            columns: currentTable.columns.filter((column) => column.name !== columnName),
          };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table = updatedCurrentTable;
            }
            return table;
          });

          set({ tables: updatedTables, currentTable: updatedCurrentTable });
        }
      },

      addIndex: (index: Index) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = { ...currentTable, indexes: [...(currentTable?.indexes ?? []), index] };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table = updatedCurrentTable;
            }
            return table;
          });

          set({ tables: updatedTables, currentTable: updatedCurrentTable });
        }
      },
      editIndex: (indexName: string, newIndex: Index) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = {
            ...currentTable,
            indexes: currentTable.indexes.map((index) => {
              if (index.name === indexName) {
                index = newIndex;
              }
              return index;
            }),
          };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table = updatedCurrentTable;
            }
            return table;
          });

          set({ tables: updatedTables, currentTable: updatedCurrentTable });
        }
      },
      deleteIndex: (indexName: string) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = {
            ...currentTable,
            indexes: currentTable.indexes.filter((index) => index.name !== indexName),
          };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table = updatedCurrentTable;
            }
            return table;
          });

          set({ tables: updatedTables, currentTable: updatedCurrentTable });
        }
      },

      addForeignKey: (foreignKey: ForeignKey) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = {
            ...currentTable,
            foreignKeys: [...(currentTable?.foreignKeys ?? []), foreignKey],
          };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table = updatedCurrentTable;
            }
            return table;
          });

          set({ tables: updatedTables, currentTable: updatedCurrentTable });
        }
      },
      deleteForeignKey: (foreignKeyName: string) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = {
            ...currentTable,
            foreignKeys: currentTable.foreignKeys.filter((foreignKey) => foreignKey.name !== foreignKeyName),
          };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
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
