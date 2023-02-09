import { Schema } from '../api/schema';

export const apiResponse: { data: Schema } = {
  data: {
    version: '4',
    dialect: 'pg',
    id: '8bdc419e-b3cc-4800-9d2b-180c94503885',
    prevId: '00000000-0000-0000-0000-000000000000',
    tables: {
      dictionaries: {
        name: 'dictionaries',
        schema: 'my_schema',
        columns: {
          id: {
            name: 'id',
            type: 'serial',
            primaryKey: true,
            notNull: true,
          },
          data: {
            name: 'data',
            type: 'jsonb',
            primaryKey: false,
            notNull: true,
          },
          user_id: {
            name: 'user_id',
            type: 'integer',
            primaryKey: false,
            notNull: true,
          },
          project_id: {
            name: 'project_id',
            type: 'integer',
            primaryKey: false,
            notNull: true,
          },
          created_at: {
            name: 'created_at',
            type: 'timestamp',
            primaryKey: false,
            notNull: false,
            default: 'now()',
          },
          updated_at: {
            name: 'updated_at',
            type: 'timestamp',
            primaryKey: false,
            notNull: false,
            default: 'now()',
          },
        },
        indexes: {
          dictionaries_project_id_index: {
            name: 'dictionaries_project_id_index',
            columns: ['project_id'],
            isUnique: true,
          },
        },
        foreignKeys: {
          dictionaries_user_id_users_id_fk: {
            name: 'dictionaries_user_id_users_id_fk',
            tableFrom: 'dictionaries',
            tableTo: 'users',
            columnsFrom: ['user_id'],
            columnsTo: ['id'],
            onDelete: 'cascade',
            onUpdate: 'no action',
          },
          dictionaries_project_id_projects_id_fk: {
            name: 'dictionaries_project_id_projects_id_fk',
            tableFrom: 'dictionaries',
            tableTo: 'projects',
            columnsFrom: ['project_id'],
            columnsTo: ['id'],
            onDelete: 'cascade',
            onUpdate: 'no action',
          },
        },
      },
      permissions: {
        name: 'permissions',
        schema: 'my_schema',
        columns: {
          user_id: {
            name: 'user_id',
            type: 'integer',
            primaryKey: false,
            notNull: true,
          },
          project_id: {
            name: 'project_id',
            type: 'integer',
            primaryKey: false,
            notNull: true,
          },
          permission: {
            name: 'permission',
            type: 'varchar(25)',
            primaryKey: false,
            notNull: true,
          },
        },
        indexes: {
          permissions_project_id_index: {
            name: 'permissions_project_id_index',
            columns: ['project_id'],
            isUnique: false,
          },
          permissions_user_id_index: {
            name: 'permissions_user_id_index',
            columns: ['user_id'],
            isUnique: false,
          },
          unique_index: {
            name: 'unique_index',
            columns: ['user_id', 'project_id', 'permission'],
            isUnique: true,
          },
        },
        foreignKeys: {
          permissions_user_id_users_id_fk: {
            name: 'permissions_user_id_users_id_fk',
            tableFrom: 'permissions',
            tableTo: 'users',
            columnsFrom: ['user_id'],
            columnsTo: ['id'],
            onDelete: 'cascade',
            onUpdate: 'no action',
          },
          permissions_project_id_projects_id_fk: {
            name: 'permissions_project_id_projects_id_fk',
            tableFrom: 'permissions',
            tableTo: 'projects',
            columnsFrom: ['project_id'],
            columnsTo: ['id'],
            onDelete: 'cascade',
            onUpdate: 'no action',
          },
        },
      },
      projects: {
        name: 'projects',
        schema: 'my_schema',
        columns: {
          id: {
            name: 'id',
            type: 'serial',
            primaryKey: true,
            notNull: true,
          },
          name: {
            name: 'name',
            type: 'varchar(256)',
            primaryKey: false,
            notNull: true,
          },
          owner_id: {
            name: 'owner_id',
            type: 'integer',
            primaryKey: false,
            notNull: true,
          },
          created_at: {
            name: 'created_at',
            type: 'timestamp',
            primaryKey: false,
            notNull: false,
            default: 'now()',
          },
        },
        indexes: {
          projects_owner_id_index: {
            name: 'projects_owner_id_index',
            columns: ['owner_id'],
            isUnique: false,
          },
        },
        foreignKeys: {
          projects_owner_id_users_id_fk: {
            name: 'projects_owner_id_users_id_fk',
            tableFrom: 'projects',
            tableTo: 'users',
            columnsFrom: ['owner_id'],
            columnsTo: ['id'],
            onDelete: 'cascade',
            onUpdate: 'no action',
          },
        },
      },
      users: {
        name: 'users',
        schema: 'my_schema',
        columns: {
          id: {
            name: 'id',
            type: 'serial',
            primaryKey: true,
            notNull: true,
          },
          email: {
            name: 'email',
            type: 'varchar',
            primaryKey: false,
            notNull: true,
          },
          password: {
            name: 'password',
            type: 'varchar(256)',
            primaryKey: false,
            notNull: true,
          },
          first_name: {
            name: 'first_name',
            type: 'varchar(256)',
            primaryKey: false,
            notNull: false,
          },
          last_name: {
            name: 'last_name',
            type: 'varchar(256)',
            primaryKey: false,
            notNull: false,
          },
          created_at: {
            name: 'created_at',
            type: 'timestamp',
            primaryKey: false,
            notNull: false,
            default: 'now()',
          },
        },
        indexes: {
          users_email_index: {
            name: 'users_email_index',
            columns: ['email'],
            isUnique: true,
          },
        },
        foreignKeys: {},
      },
    },
    enums: {},
    schemas: {
      my_schema: 'my_schema',
    },
  },
};
