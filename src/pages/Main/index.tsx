import React, { useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';
import EmptyContainer from '../../components/EmptyContainer';
import AddTableModal from '../../components/AddTableModal';

const Main: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <mui.Box css={css.container}>
      <mui.Box css={css.header}>
        <mui.Typography css={css.title}>Your tables</mui.Typography>
        <mui.IconButton css={css.addButton} onClick={() => setIsAddModalOpen(true)}>
          <muiIcons.Add />
        </mui.IconButton>
      </mui.Box>

      <EmptyContainer openModal={() => setIsAddModalOpen(true)} />

      <AddTableModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </mui.Box>
  );
};

export default Main;
