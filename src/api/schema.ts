import { instance } from './instance';

export const getSchema = async () => instance.get<{ data: Schema }>('');

export const postSchema = async (schema: Schema) =>
  instance.post<{ data: Schema }>('', {
    data: schema,
  });

export interface Schema {
  version: string;
  dialect: string;
  id: string;
  prevId: string;
  tables: {
    [key: string]: {
      name: string;
      schema: string;
      columns: {
        [key: string]: {
          type: string;
          name: string;
          primaryKey: boolean;
          notNull: boolean;
          default?: any;
        };
      };
      indexes: {
        [key: string]: {
          name: string;
          columns: string[];
          isUnique: boolean;
        };
      };
      foreignKeys: {
        [key: string]: {
          name: string;
          tableFrom: string;
          columnsFrom: string[];
          tableTo: string;
          columnsTo: string[];
          onUpdate: 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
          onDelete: 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
        };
      };
    };
  };
  enums: {};
  schemas: {
    [key: string]: string;
  };
}
