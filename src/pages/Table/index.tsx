import React, { useEffect, useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import * as css from './css';
import { GenericObject, saveTables } from '../../utils/localStorage';

interface TablePageProps {
  tables: GenericObject;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
}

const Table: React.FC<TablePageProps> = ({ tables, setTables }) => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  console.log(tables[tableId]);

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
          <mui.Typography css={css.title}>{tableId}</mui.Typography>
        </mui.Box>
        <mui.IconButton css={css.addButton} onClick={() => setIsAddModalOpen(true)}>
          <muiIcons.Add />
        </mui.IconButton>
      </mui.Box>
    </mui.Box>
  );
};

export default Table;
