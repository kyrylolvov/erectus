import React from 'react';
import * as mui from '@mui/material';
import * as css from './css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  width?: number;
  sx?: mui.SxProps<mui.Theme> | undefined;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, width, sx }) => (
  <mui.Button css={css.button(width)} sx={sx} onClick={onClick} disabled={disabled}>
    {text}
  </mui.Button>
);

export default Button;
