import React from 'react';
import * as mui from '@mui/material';
import * as css from './css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  sx?: mui.SxProps<mui.Theme> | undefined;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, sx, onClick, disabled }) => (
  <mui.Button css={css.button} sx={sx} onClick={onClick} disabled={disabled}>
    {text}
  </mui.Button>
);

export default Button;
