import React from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';
import Button from '../Button';

const EmptyContainer: React.FC = () => (
  <mui.Box css={css.emptyContainer}>
    <mui.Box css={css.cubeIconContainer}>
      <muiIcons.Dashboard />
    </mui.Box>
    <mui.Typography variant="subtitle1">No Tables</mui.Typography>
    <mui.Typography variant="body1">
      You don&apos;t have any Tables yet. Click the button below to get started
    </mui.Typography>
    <Button text="Create Table" sx={{ marginTop: '16px' }} />
  </mui.Box>
);

export default EmptyContainer;
