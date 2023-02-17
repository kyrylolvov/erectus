import React from 'react';
import * as mui from '@mui/material';
import { BooleanDefaultValues, ColumnType, getBooleanValueName, KeyOfBooleanDefaultValues } from '../../utils/columns';
import Input from '../Input';
import Select from '../Select';

interface ColumnDefaultValueInputProps {
  type: ColumnType | string;
  value: string | string[];
  disabled?: boolean | undefined;
  onChange: (value: string) => void;
}

const ColumnDefaultValueInput: React.FC<ColumnDefaultValueInputProps> = ({ type, value, onChange, disabled }) => {
  if (type !== ColumnType.Boolean) {
    return (
      <Input
        disabled={disabled}
        label="Default Value"
        placeholder="NULL"
        type={
          [
            ColumnType.Integer,
            ColumnType.Decimal,
            ColumnType.Numeric,
            ColumnType['Big Integer'],
            ColumnType['Small Integer'],
          ].includes(type as ColumnType)
            ? 'number'
            : 'text'
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <Select
      label="Default Value"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      renderValue={(selected) => {
        if (selected.length) {
          return getBooleanValueName(selected as BooleanDefaultValues);
        }
        return 'NULL';
      }}
    >
      {(Object.keys(BooleanDefaultValues) as Array<KeyOfBooleanDefaultValues>).map((booleanDefaultValue) => (
        <mui.MenuItem key={BooleanDefaultValues[booleanDefaultValue]} value={BooleanDefaultValues[booleanDefaultValue]}>
          {booleanDefaultValue}
        </mui.MenuItem>
      ))}
    </Select>
  );
};

export default ColumnDefaultValueInput;
