import { ZodError, ZodIssue } from "zod";
import { pgSchema, PgSchema } from "./serializer/pgSchema";
import { schemaToTypeScript } from "./TSConverter";

// interface PgSchema {
//   version: "4";
//   dialect: "pg";
//   tables: {
//     [key: string]: {
//       name: string;
//       schema: string;
//       columns: {
//         [key: string]: {
//           type: "smallint" | "integer" | "bigint" | "boolean" | "text" | "varchar" | "serial" | "bigserial"
//             | "decimal" | "numeric" | "json" | "jsonb" | "time" | "timestamp" | "date" | "doublePrecision";
//           name: string;
//           primaryKey: boolean;
//           notNull: boolean;
//           default?: any;
//         }
//       };
//       indexes: {
//         [key: string]: {
//           name: string;
//           columnsTo: string[];
//           isUnique: boolean;
//         };
//       };
//       foreignKeys: {
//         [key: string]: {
//           name: string;
//           tableFrom: string;
//           columnsFrom: string[];
//           tableTo: string;
//           columnsTo: string[];
//           onUpdate?: "cascade" | "restrict" | "no action" | "set null" | "set default";
//           onDelete?: "cascade" | "restrict" | "no action" | "set null" | "set default";
//         }
//       };
//     }
//   };
//   enums: {
//     [key: string]: {
//       values: { [key: string]: string; };
//       name: string;
//     }
//   };
//   schemas: { [key: string]: string; };
// };

const json: PgSchema = {
  version: "4",
  dialect: "pg",
  tables: {
    permissions: {
      schema: "my_schema",
      name: "permissions",
      columns: {
        user_id: {
          name: "user_id",
          type: "integer",
          primaryKey: false,
          notNull: true
        },
        project_id: {
          name: "project_id",
          type: "integer",
          primaryKey: false,
          notNull: true
        },
        permission: {
          name: "permission",
          type: "varchar",
          primaryKey: false,
          notNull: true
        }
      },
      indexes: {
        permissions_project_id_index: {
          name: "permissions_project_id_index",
          columns: [
            "project_id"
          ],
          isUnique: false
        },
        permissions_user_id_index: {
          name: "permissions_user_id_index",
          columns: [
            "user_id"
          ],
          isUnique: false
        },
        unique_index: {
          name: "unique_index",
          columns: [
            "user_id",
            "project_id",
            "permission"
          ],
          isUnique: true
        }
      },
      foreignKeys: {
        permissions_user_id_users_id_fk: {
          name: "permissions_user_id_users_id_fk",
          tableFrom: "permissions",
          tableTo: "users",
          columnsFrom: [
            "user_id"
          ],
          columnsTo: [
            "id"
          ],
          onDelete: "cascade"
        },
        permissions_project_id_projects_id_fk: {
          name: "permissions_project_id_projects_id_fk",
          tableFrom: "permissions",
          tableTo: "projects",
          columnsFrom: [
            "project_id"
          ],
          columnsTo: [
            "id"
          ],
          onDelete: "cascade"
        }
      }
    },
    projects: {
      schema: "my_schema",
      name: "projects",
      columns: {
        id: {
          name: "id",
          type: "serial",
          primaryKey: true,
          notNull: false
        },
        name: {
          name: "name",
          type: "varchar",
          primaryKey: false,
          notNull: true
        },
        owner_id: {
          name: "owner_id",
          type: "integer",
          primaryKey: false,
          notNull: true
        },
        created_at: {
          name: "created_at",
          type: "timestamp",
          primaryKey: false,
          notNull: false,
          default: "now()"
        }
      },
      indexes: {
        projects_owner_id_index: {
          name: "projects_owner_id_index",
          columns: [
            "owner_id",
          ],
          isUnique: false
        }
      },
      foreignKeys: {
        projects_owner_id_users_id_fk: {
          name: "projects_owner_id_users_id_fk",
          tableFrom: "projects",
          tableTo: "users",
          columnsFrom: [
            "owner_id"
          ],
          columnsTo: [
            "id"
          ],
          onDelete: "cascade"
        }
      }
    },
    users: {
      schema: "my_schema",
      name: "users",
      columns: {
        id: {
          name: "id",
          type: "serial",
          primaryKey: true,
          notNull: false
        },
        email: {
          name: "email",
          type: "varchar",
          primaryKey: false,
          notNull: true
        },
        password: {
          name: "password",
          type: "varchar",
          primaryKey: false,
          notNull: true
        },
        first_name: {
          name: "first_name",
          type: "varchar",
          primaryKey: false,
          notNull: false
        },
        last_name: {
          name: "last_name",
          type: "varchar",
          primaryKey: false,
          notNull: false
        }
      },
      indexes: {
        users_email_index: {
          name: "users_email_index",
          columns: [
            "email"
          ],
          isUnique: true
        }
      },
      foreignKeys: {},
    }
  },
  enums: {
    activity_type: {
      name: "activity_type",
      values: {
        "INTERNSHIP": "INTERNSHIP",
        "TEST": "TEST",
      }
    },
  },
  schemas: {
    "my_schema": "my_schema"
  }
};

try {
  const result: PgSchema = pgSchema.parse(json);
  const ts: string = schemaToTypeScript(result);

  console.log(ts)
} catch (err: any) {
  if (err instanceof ZodError) {
    const issue: ZodIssue = err.issues[0];

    const issuePath = issue.path && issue.path.length ? issue.path[issue.path.length - 1] : undefined;
    const issueMessage = issue.message ? issue.message : '';

    console.log(issuePath, issueMessage);
  } else {
    console.log(err.message);
  }
}
