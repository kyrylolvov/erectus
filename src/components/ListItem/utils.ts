interface IListItem {
  text: string;
}
interface IColumnItemProps extends IListItem {
  type: 'column';
  isPrimaryKey: boolean;
  isInteger: boolean;
  isUnique?: boolean;
  foreignKey: string;
}

interface ITableItemProps extends IListItem {
  type: 'table';
  isPrimaryKey?: boolean;
  isInteger?: boolean;
  isUnique?: boolean;
  foreignKey?: string;
}

interface IIndexItemProps extends IListItem {
  type: 'index';
  isPrimaryKey?: boolean;
  isInteger?: boolean;
  isUnique: boolean;
  foreignKey?: string;
}

interface IForeignKeyProps extends IListItem {
  type: 'foreignKey';
  isPrimaryKey?: boolean;
  isInteger?: boolean;
  isUnique?: boolean;
  foreignKey?: string;
}

export type ListItemProps = IColumnItemProps | ITableItemProps | IIndexItemProps | IForeignKeyProps;
