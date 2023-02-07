import { ColumnType, PrimaryColumnType } from '../utils/columns';

export interface Table {
  name: string;
  columns: Column[];
  indexes: Index[];
  foreignKeys: ForeignKey[];
}

export interface Column {
  name: string;
  type: ColumnType | PrimaryColumnType | '';
  primaryKey: boolean;
  notNull: boolean;
}

export interface Index {
  name: string;
  columnsTo: string[];
  isUnique: boolean;
}

export interface ForeignKey {
  name: string;
  tableFrom: string;
  columnsFrom: string;
  tableTo: string;
  columnsTo: string;
  onUpdate: ForeignKeyAction;
  onDelete: ForeignKeyAction;
}

export type ForeignKeyAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';

export interface ErectusStore {
  tables: Table[];
  currentTable: Table | null;

  addTable: (newTable: Table) => void;
  deleteTable: (tableName: string) => void;
  setCurrentTable: (tableName: string) => void;

  addColumn: (column: Column) => void;
  editColumn: (columnName: string, column: Column) => void;
  deleteColumn: (columnName: string) => void;

  addIndex: (index: Index) => void;
  deleteIndex: (indexName: string) => void;
  editIndex: (indexName: string, index: Index) => void;

  addForeignKey: (foreignKey: ForeignKey) => void;
  deleteForeignKey: (foreignKeyName: string) => void;
}

export enum ModalState {
  Closed = '',
  Add = 'add',
  Edit = 'edit',
}
