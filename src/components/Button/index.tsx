import React from 'react';
import * as mui from '@mui/material';
import * as css from './css';

interface ButtonProps {
  text: string;
  sx?: mui.SxProps<mui.Theme> | undefined;
}

const Button: React.FC<ButtonProps> = ({ text, sx }) => (
  <mui.Button css={css.button} sx={sx}>
    {text}
  </mui.Button>
);

export default Button;
