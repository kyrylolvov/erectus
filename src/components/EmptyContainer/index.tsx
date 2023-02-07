import React from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';
import Button from '../Button';

interface EmptyContainerProps {
  title: string;
  text: string;
  buttonText: string;
  buttonAction: () => void;
}

const EmptyContainer: React.FC<EmptyContainerProps> = ({ title, text, buttonText, buttonAction }) => (
  <mui.Box css={css.emptyContainer}>
    <mui.Box css={css.cubeIconContainer}>
      <muiIcons.Dashboard />
    </mui.Box>
    <mui.Typography variant="subtitle1">{title}</mui.Typography>
    <mui.Typography variant="body1">{text}</mui.Typography>
    <Button text={buttonText} sx={{ marginTop: '24px' }} width={150} onClick={buttonAction} />
  </mui.Box>
);

export default EmptyContainer;
