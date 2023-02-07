import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Column, ErectusStore, Table } from './types';

export const useStore = create<ErectusStore>()(
  persist(
    (set, get) => ({
      tables: [],
      currentTable: null,

      addTable: (newTable: Table) => set({ tables: [...get().tables, newTable] }),
      deleteTable: (tableName: string) => set({ tables: get().tables.filter((table) => table.name !== tableName) }),
      setCurrentTable: (tableName: string) => set({ currentTable: get().tables.find((table) => table.name === tableName) }),

      addColumn: (column: Column) => {
        const { currentTable, tables } = get();

        if (currentTable) {
          const updatedCurrentTable = { ...currentTable, columns: [...(currentTable?.columns ?? []), column] };
          const updatedTables = tables.map((table) => {
            if (table.name === currentTable.name) {
              table.columns = [...table.columns, column];
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
              table.columns = table.columns.map((column) => {
                if (column.name === columnName) {
                  column = newColumn;
                }
                return column;
              });
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
