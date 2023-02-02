import React, { useEffect, useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';
import EmptyContainer from '../../components/EmptyContainer';
import AddTableModal from '../../components/AddTableModal';
import { GenericObject, saveTables } from '../../utils/localStorage';
import TableListItem from '../../components/TableListItem';

interface MainPageProps {
  tables: GenericObject;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
}

const Main: React.FC<MainPageProps> = ({ tables, setTables }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
        <EmptyContainer
          title="No Tables"
          text={"You don't have any Tables yet. Click the button below to get started"}
          buttonText="Create Table"
          buttonAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <mui.Box css={css.tableList}>
          {Object.keys(tables).map((key) => (
            <TableListItem key={key} setTables={setTables} tableName={key} />
          ))}
        </mui.Box>
      )}

      <AddTableModal
        tables={tables}
        setTables={setTables}
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </mui.Box>
  );
};

export default Main;
