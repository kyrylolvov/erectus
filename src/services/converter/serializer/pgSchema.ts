import { any, boolean, string, enum as enumType, TypeOf, object, record, literal, preprocess } from 'zod';
import { isAlphaNumeric } from '../utils/AlphaNumeric';
import { isFirstLetter } from '../utils/IsFirstLetter';

const fkActions = ['cascade', 'restrict', 'no action', 'set null', 'set default'] as const;
const columnTypes = [
  'smallint',
  'integer',
  'bigint',
  'boolean',
  'text',
  'varchar',
  'serial',
  'bigserial',
  'decimal',
  'numeric',
  'json',
  'jsonb',
  'time',
  'timestamp',
  'date',
  'doublePrecision',
] as const;

const isValidKeyName = preprocess(
  (value) => {
    if (!value || typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    const isValid = isAlphaNumeric(trimmed);
    const isFirstCharLetter = isFirstLetter(trimmed);
    if (!isValid || !isFirstCharLetter) return undefined;
    return trimmed;
  },
  string()
    .min(1)
    .transform((val) => val.toLowerCase())
);

const enumSchema = object({
  name: string(),
  values: record(isValidKeyName, string()),
}).strict();

const index = object({
  name: isValidKeyName,
  columns: string().array(),
  isUnique: boolean(),
}).strict();

const fk = object({
  name: isValidKeyName,
  tableFrom: isValidKeyName,
  columnsFrom: string().array(),
  tableTo: isValidKeyName,
  columnsTo: string().array(),
  onUpdate: enumType(fkActions).optional(),
  onDelete: enumType(fkActions).optional(),
}).strict();

const column = object({
  name: isValidKeyName,
  type: enumType(columnTypes),
  primaryKey: boolean(),
  notNull: boolean(),
  default: any().optional(),
}).strict();

const table = object({
  name: isValidKeyName,
  schema: isValidKeyName,
  columns: record(isValidKeyName, column),
  indexes: record(isValidKeyName, index),
  foreignKeys: record(isValidKeyName, fk),
}).strict();

export const pgSchemaInternal = object({
  version: literal('4'),
  dialect: enumType(['pg']),
  tables: record(isValidKeyName, table),
  enums: record(isValidKeyName, enumSchema),
  schemas: record(isValidKeyName, isValidKeyName),
});

export const pgSchema = pgSchemaInternal;

export type Column = TypeOf<typeof column>;
export type PgSchema = TypeOf<typeof pgSchema>;
export type Index = TypeOf<typeof index>;
export type ForeignKey = TypeOf<typeof fk>;
