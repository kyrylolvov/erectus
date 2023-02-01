import React from 'react';
import * as mui from '@mui/material';
import * as css from './css';

interface ButtonProps {
  text: string;
  sx?: mui.SxProps<mui.Theme> | undefined;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, sx, onClick }) => (
  <mui.Button css={css.button} sx={sx} onClick={onClick}>
    {text}
  </mui.Button>
);

export default Button;
