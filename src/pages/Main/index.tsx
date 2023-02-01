import React from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';
import EmptyContainer from '../../components/EmptyContainer';

const Main: React.FC = () => {
  console.log('page');

  return (
    <mui.Box css={css.container}>
      <mui.Box css={css.header}>
        <mui.Typography css={css.title}>Your tables</mui.Typography>
        <mui.IconButton css={css.addButton}>
          <muiIcons.Add />
        </mui.IconButton>
      </mui.Box>

      <EmptyContainer />
    </mui.Box>
  );
};

export default Main;
