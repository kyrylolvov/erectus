import React from 'react';
import * as mui from '@mui/material';
import * as css from './css';

interface InputProps {
  label: string;
  value: string | string[];
  placeholder: string;
  onChange?: (e: mui.SelectChangeEvent<any>) => void;
  name?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, disabled, placeholder, name }) => (
  <mui.Box>
    <mui.Typography css={css.inputLabel}>{label}</mui.Typography>
    <input
      className="erectus-input"
      value={value}
      name={name}
      onChange={onChange}
      css={css.input}
      placeholder={placeholder}
      disabled={disabled}
    />
  </mui.Box>
);

export default Input;
