import {
  any,
  boolean,
  string,
  enum as enumType,
  TypeOf,
  object,
  record,
  literal,
  preprocess,
} from "zod";
import { isAlphaNumeric } from "../utils/AlphaNumeric";
import { isFirstLetter } from "../utils/IsFirstLetter";

const fkActions = ['cascade', 'restrict', 'no action', 'set null', 'set default'] as const;
const columnTypes = [
  "smallint",
  "integer",
  "bigint",
  "boolean",
  "text",
  "varchar",
  "serial",
  "bigserial",
  "decimal",
  "numeric",
  "json",
  "jsonb",
  "time",
  "timestamp",
  "date",
  "doublePrecision",
] as const;

const isValidKey = (value: any) => {
  if (!value || typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  const isValid = isAlphaNumeric(trimmed);
  const isFirstCharLetter = isFirstLetter(trimmed);
  if (!isValid || !isFirstCharLetter) return undefined;
  return trimmed;
};

const enumSchema = object({
  name: string(),
  values: record(
    preprocess(
      (value) => isValidKey(value),
      string().min(1),
    ),
    string()),
}).strict();

const index = object({
  name: preprocess(
    (value) => isValidKey(value),
    string().min(1),
  ),
  columns: string().array(),
  isUnique: boolean(),
}).strict();

const fk = object({
  name: preprocess(
    (value) => isValidKey(value),
    string().min(1),
  ),
  tableFrom: string(),
  columnsFrom: string().array(),
  tableTo: string(),
  columnsTo: string().array(),
  onUpdate: enumType(fkActions).optional(),
  onDelete: enumType(fkActions).optional(),
}).strict();

const column = object({
  name: preprocess(
    (value) => isValidKey(value),
    string().min(1),
  ),
  type: enumType(columnTypes),
  primaryKey: boolean(),
  notNull: boolean(),
  default: any().optional(),
}).strict();

const table = object({
  name: preprocess(
    (value) => isValidKey(value),
    string().min(1),
  ),
  schema: preprocess(
    (value) => isValidKey(value),
    string().min(1),
  ),
  columns: record(
    preprocess(
      (value) => isValidKey(value),
      string().min(1),
    ),
    column,
  ),
  indexes: record(
    preprocess(
      (value) => isValidKey(value),
      string().min(1),
    ),
    index,
  ),
  foreignKeys: record(
    preprocess(
      (value) => isValidKey(value),
      string().min(1),
    ),
    fk,
  ),
}).strict();

export const pgSchemaInternal = object({
  version: literal("4"),
  dialect: enumType(["pg"]),
  tables: record(
    preprocess(
      (value) => isValidKey(value),
      string().min(1),
    ),
    table,
  ),
  enums: record(
    preprocess(
      (value) => isValidKey(value),
      string().min(1),
    ),
    enumSchema,
  ),
  schemas: record(
    preprocess(
      (value) => isValidKey(value),
      string().min(1),
    ),
    string(),
  ),
});

export const pgSchema = pgSchemaInternal;

export type Column = TypeOf<typeof column>;
export type PgSchema = TypeOf<typeof pgSchema>;
export type Index = TypeOf<typeof index>;
export type ForeignKey = TypeOf<typeof fk>;
