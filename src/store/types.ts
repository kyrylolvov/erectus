import { ColumnType, PrimaryColumnType } from '../utils/columns';

export interface Table {
  name: string;
  columns: Column[];
  indexes: Index[];
  foreignKeys: ForeignKey[];
}

export interface TableItem {
  name: string;
}

export interface Column extends TableItem {
  type: ColumnType | PrimaryColumnType | string;
  primaryKey: boolean;
  notNull: boolean;
}

export interface Index extends TableItem {
  columns: string[];
  isUnique: boolean;
}

export interface ForeignKey extends TableItem {
  tableFrom: string;
  columnsFrom: string[];
  tableTo: string;
  columnsTo: string[];
  onUpdate: ForeignKeyAction;
  onDelete: ForeignKeyAction;
}

export type ForeignKeyAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';

export interface ErectusStore {
  tables: Table[];
  currentTable: Table | null;

  fetchSchema: () => Promise<void>;
  updateSchema: () => Promise<void>;

  addTable: (newTable: Table) => void;
  deleteTable: (tableName: string) => void;
  setCurrentTable: (tableName: string) => void;

  addColumn: (column: Column) => void;
  editColumn: (columnName: string, column: Column) => void;
  deleteColumn: (columnName: string) => void;

  addIndex: (index: Index) => void;
  editIndex: (indexName: string, index: Index) => void;
  deleteIndex: (indexName: string) => void;

  addForeignKey: (foreignKey: ForeignKey) => void;
  editForeignKey: (indexName: string, foreignKey: ForeignKey) => void;
  deleteForeignKey: (foreignKeyName: string) => void;

  updateTables: (values: UpdateTablesUnion) => void;
}

export enum ModalState {
  Closed = '',
  Add = 'add',
  Edit = 'edit',
}

export enum UpdateTablesAction {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}

interface UpdateTables {
  action: UpdateTablesAction;
  itemName?: string;
}

export interface UpdateTablesColumn extends UpdateTables {
  objectKey: 'column';
  item?: Column;
}

export interface UpdateTablesIndex extends UpdateTables {
  objectKey: 'index';
  item?: Index;
}

export interface UpdateTablesForeignKey extends UpdateTables {
  objectKey: 'foreignKey';
  item?: ForeignKey;
}

export type UpdateTablesUnion = UpdateTablesColumn | UpdateTablesIndex | UpdateTablesForeignKey;
