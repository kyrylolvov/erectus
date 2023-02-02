import React, { useEffect, useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import * as css from './css';
import { GenericObject, saveTables } from '../../utils/localStorage';
import EmptyContainer from '../../components/EmptyContainer';

interface TablePageProps {
  tables: GenericObject;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
}

const Table: React.FC<TablePageProps> = ({ tables, setTables }) => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    saveTables(tables);
  }, [tables]);

  return (
    <mui.Box css={css.container}>
      <mui.Box css={css.header}>
        <mui.Box sx={{ display: 'flex', alignItems: 'center' }}>
          <mui.IconButton sx={{ marginRight: '16px' }} css={css.backButton} onClick={() => navigate('/')}>
            <muiIcons.ArrowBack />
          </mui.IconButton>
          {!!tables[tableId!] && <mui.Typography css={css.title}>{tableId}</mui.Typography>}
        </mui.Box>
        {!!tables[tableId!] && (
          <mui.IconButton css={css.addButton} onClick={() => setIsAddModalOpen(true)}>
            <muiIcons.Add />
          </mui.IconButton>
        )}
      </mui.Box>

      {!tables[tableId!] && (
        <EmptyContainer
          title="Table doesn't exist"
          text={"You don't have a table with specified name, please create it on the main page"}
          buttonText="Go back"
          buttonAction={() => navigate('/')}
        />
      )}
    </mui.Box>
  );
};

export default Table;