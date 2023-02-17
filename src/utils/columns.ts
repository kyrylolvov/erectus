export enum PrimaryColumnType {
  'Serial' = 'serial',
  'BigSerial' = 'bigserial',
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

export enum BooleanDefaultValues {
  'True' = 'true',
  'False' = 'false',
  'NULL' = 'null',
}

export const positiveNumberTypingValidation = (value: string): string => {
  const validatedValue = value.replace(/[^0-9]/gi, '');
  return validatedValue;
};

export const variableTypingValidation = (value: string): string => {
  const validatedValue =
    value.length > 1 ? value.replace(' ', '_').replace(/[^a-zA-Z0-9_]/gi, '') : value.replace(/[^A-Za-z]/gi, '');
  return validatedValue;
};

export const getPrimaryColumnTypeName = (enumValue: PrimaryColumnType) => {
  const name = (Object.keys(PrimaryColumnType) as Array<KeyOfPrimaryColumnType>).map((columnType) => {
    if (PrimaryColumnType[columnType] === enumValue) return columnType;
    return '';
  });
  return name;
};

export const getColumnTypeName = (enumValue: ColumnType) => {
  const name = (Object.keys(ColumnType) as Array<KeyOfColumnType>).map((columnType) => {
    if (ColumnType[columnType] === enumValue) return columnType;
    return '';
  });
  return name;
};

export const getBooleanValueName = (enumValue: BooleanDefaultValues) => {
  const name = (Object.keys(BooleanDefaultValues) as Array<KeyOfBooleanDefaultValues>).map((booleanDefaultValue) => {
    if (BooleanDefaultValues[booleanDefaultValue] === enumValue) return booleanDefaultValue;
    return '';
  });
  return name;
};

export type KeyOfPrimaryColumnType = keyof typeof PrimaryColumnType;
export type KeyOfColumnType = keyof typeof ColumnType;
export type KeyOfBooleanDefaultValues = keyof typeof BooleanDefaultValues;

export const variableNameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
