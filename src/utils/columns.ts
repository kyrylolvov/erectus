export enum ColumnType {
  Serial = 'serial',
  BigSerial = 'bigserial',
  String = 'varchar',
  Text = 'text',
  Boolean = 'boolean',
  Integer = 'integer',
  Decimal = 'decimal',
  Numeric = 'numeric',
  Time = 'time',
  Timestamp = 'timestamp',
  Date = 'date',
  JSON = 'json',
  JSONB = 'jsonb',

  'Big Integer' = 'bigint',
  'Small Integer' = 'smallint',
}

export enum ColumnTypeName {
  String = 'String',
  Text = 'Text',
  Boolean = 'Boolean',
  Integer = 'Integer',
  BigInteger = 'Big Integer',
  SmallInteger = 'Small Integer',
  Decimal = 'Decimal',
  Numeric = 'Numeric',
  Time = 'Time',
  Timestamp = 'Timestamp',
  Date = 'Date',
  Json = 'JSON',
  Jsonb = 'JSONB',
}

export type KeyOfColumnType = keyof typeof ColumnType;
export type KeyOfColumnTypeName = keyof typeof ColumnTypeName;

export const variableNameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
