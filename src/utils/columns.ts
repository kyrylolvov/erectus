export enum PrimaryColumnType {
  Serial = 'serial',
  BigSerial = 'bigserial',
}

export enum ColumnType {
  'String' = 'varchar',
  'Text' = 'text',
  'Boolean' = 'boolean',
  'Integer' = 'integer',
  'Decimal' = 'decimal',
  'Numeric' = 'numeric',
  'Time' = 'time',
  'Timestamp' = 'timestamp',
  'Date' = 'date',
  'JSON' = 'json',
  'JSONB' = 'jsonb',
  'Big Integer' = 'bigint',
  'Small Integer' = 'smallint',
}

export const variableTypingValidation = (value: string): string => {
  const validatedValue =
    value.length > 1 ? value.replace(' ', '_').replace(/[^a-zA-Z0-9_]/gi, '') : value.replace(/[^A-Za-z]/gi, '');
  return validatedValue;
};

export type KeyOfColumnType = keyof typeof ColumnType;

export const variableNameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
