import React from 'react';
import * as mui from '@mui/material';
import * as css from './css';

interface SelectProps {
  label: string;
  value: string | string[];
  onChange: (e: mui.SelectChangeEvent<any>) => void;
  renderValue?: (value: string | string[]) => React.ReactNode;
  disabled?: boolean;
  multiple?: boolean;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, disabled, renderValue, multiple, children }) => (
  <mui.Box>
    <mui.Typography css={css.inputLabel}>{label}</mui.Typography>
    <mui.Box css={css.selectField(!value.length)}>
      <mui.Select
        value={value}
        onChange={onChange}
        renderValue={renderValue}
        displayEmpty
        multiple={multiple}
        disabled={disabled}
        MenuProps={{
          style: { maxHeight: '200px' },
        }}
      >
        {children}
      </mui.Select>
    </mui.Box>
  </mui.Box>
);

export default Select;
