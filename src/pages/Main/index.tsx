import React, { useEffect, useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';
import EmptyContainer from '../../components/EmptyContainer';
import AddTableModal from '../../components/AddTableModal';
import { GenericObject, loadTables, saveTables } from '../../utils/localStorage';
import TableListItem from '../../components/TableListItem';

const Main: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tables, setTables] = useState<GenericObject>(loadTables() ?? {});

  useEffect(() => {
    saveTables(tables);
  }, [tables]);

  return (
    <mui.Box css={css.container}>
      <mui.Box css={css.header}>
        <mui.Typography css={css.title}>Your tables</mui.Typography>
        <mui.IconButton css={css.addButton} onClick={() => setIsAddModalOpen(true)}>
          <muiIcons.Add />
        </mui.IconButton>
      </mui.Box>

      {JSON.stringify(tables) === '{}' ? (
        <EmptyContainer openModal={() => setIsAddModalOpen(true)} />
      ) : (
        <mui.Box css={css.tableList}>
          {Object.keys(tables).map((key) => (
            <TableListItem setTables={setTables} tableName={key} />
          ))}
        </mui.Box>
      )}

      <AddTableModal setTables={setTables} open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </mui.Box>
  );
};

export default Main;
