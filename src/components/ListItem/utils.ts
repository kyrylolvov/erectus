import { GenericObject } from '../../utils/localStorage';

interface IListItem {
  text: string;
  setTables: React.Dispatch<GenericObject>;
}
interface IColumnItemProps extends IListItem {
  type: 'column';
  isPrimaryKey: boolean;
  isInteger: boolean;
  foreignKey: string;
  openAddKeyModal: (column: string) => void;
  isUnique?: boolean;
  currentTable: string;
}

interface ITableItemProps extends IListItem {
  type: 'table';
  isPrimaryKey?: boolean;
  isInteger?: boolean;
  foreignKey?: string;
  openAddKeyModal?: (column: string) => void;
  isUnique?: boolean;
  currentTable?: string;
}

interface IIndexItemProps extends IListItem {
  type: 'index';
  isPrimaryKey?: boolean;
  isInteger?: boolean;
  foreignKey?: string;
  openAddKeyModal?: (column: string) => void;
  isUnique: boolean;
  currentTable: string;
}

interface IForeignKeyProps extends IListItem {
  type: 'foreignKey';
  isPrimaryKey?: boolean;
  isInteger?: boolean;
  foreignKey?: string;
  openAddKeyModal?: (column: string) => void;
  isUnique?: boolean;
  currentTable: string;
}

export type ListItemProps = IColumnItemProps | ITableItemProps | IIndexItemProps | IForeignKeyProps;
