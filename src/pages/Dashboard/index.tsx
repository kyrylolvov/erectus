import React, { useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';
import EmptyContainer from '../../components/EmptyContainer';
import { useStore } from '../../store';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import { ModalState } from '../../store/types';
import TableModal from '../../components/TableModal';

const DashboardPage: React.FC = () => {
  const { tables, updateSchema } = useStore((state) => state);

  const [tableModal, setTableModal] = useState<ModalState>(ModalState.Closed);

  return (
    <mui.Box css={css.container}>
      <mui.Box css={css.header}>
        <mui.Typography css={css.title}>Your tables</mui.Typography>
        <mui.IconButton css={css.addButton} onClick={() => setTableModal(ModalState.Add)}>
          <muiIcons.Add />
        </mui.IconButton>
      </mui.Box>

      {tables.length ? (
        <>
          <mui.Box css={css.tableList}>
            {tables.map((table) => (
              <ListItem key={`table-${table.name}`} text={table.name} type="table" />
            ))}
          </mui.Box>
          <mui.Box sx={{ marginTop: '24px' }}>
            <Button text="Save Changes" width={150} onClick={() => updateSchema()} />
          </mui.Box>
        </>
      ) : (
        <EmptyContainer
          title="No Tables"
          text={"You don't have any Tables yet. Click the button below to get started"}
          buttonText="Create Table"
          buttonAction={() => setTableModal(ModalState.Add)}
        />
      )}

      <TableModal open={tableModal} onClose={() => setTableModal(ModalState.Closed)} />
    </mui.Box>
  );
};

export default DashboardPage;
