import React, { useEffect, useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import * as css from './css';
import { ModalState } from '../../store/types';
import { useStore } from '../../store';
import EmptyContainer from '../../components/EmptyContainer';
import ListItem from '../../components/ListItem';
import ColumnModal from '../../components/ColumnModal';
import IndexModal from '../../components/IndexModal';

const TablePage: React.FC = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const { currentTable, setCurrentTable } = useStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [columnModal, setColumnModal] = useState(ModalState.Closed);
  const [indexModal, setIndexModal] = useState(ModalState.Closed);

  useEffect(() => {
    setCurrentTable(tableId ?? '');
  }, []);

  return (
    <mui.Box css={css.container}>
      <mui.Box css={css.header}>
        <mui.Box sx={{ display: 'flex', alignItems: 'center' }}>
          <mui.IconButton sx={{ marginRight: '16px' }} css={css.backButton} onClick={() => navigate('/')}>
            <muiIcons.ArrowBack />
          </mui.IconButton>
          {currentTable && <mui.Typography css={css.title}>{tableId}</mui.Typography>}
        </mui.Box>
        {currentTable && (
          <>
            <mui.IconButton css={css.addButton} onClick={(e) => setAnchorEl(e.currentTarget)}>
              <muiIcons.Add />
            </mui.IconButton>
            <mui.Popover
              open={Boolean(anchorEl)}
              className="item-popover"
              onClose={() => setAnchorEl(null)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <mui.Typography
                css={css.popoverItem}
                onClick={() => {
                  setColumnModal(ModalState.Add);
                  setAnchorEl(null);
                }}
              >
                Add column
              </mui.Typography>
              <mui.Typography
                sx={{ marginTop: '4px' }}
                css={css.popoverItem}
                onClick={() => {
                  setIndexModal(ModalState.Add);
                  setAnchorEl(null);
                }}
              >
                Add index
              </mui.Typography>
            </mui.Popover>
          </>
        )}
      </mui.Box>

      {currentTable ? (
        <mui.Box>
          <mui.Typography css={css.tableListTitle}>Columns</mui.Typography>
          <mui.Box css={css.tableList}>
            {currentTable.columns.map((column) => (
              <ListItem
                key={`${currentTable.name}-${column.name}-column`}
                text={column.name}
                type="column"
                isPrimaryKey={column.primaryKey}
                isInteger={['integer', 'bigint'].includes(column.type)}
                foreignKey=""
                openAddKeyModal={() => {}}
              />
            ))}
          </mui.Box>

          {!!currentTable.indexes.length && (
            <mui.Box>
              <mui.Typography css={css.tableListTitle}>Indexes</mui.Typography>
              <mui.Box css={css.tableList}>
                {currentTable.indexes.map((index) => (
                  <ListItem
                    key={`${currentTable.name}-${index.name}-index`}
                    text={index.name}
                    type="index"
                    isUnique={index.isUnique}
                  />
                ))}
              </mui.Box>
            </mui.Box>
          )}

          {/* 
          {!!Object.keys(tables[tableId!].indexes).length && (
            <mui.Box>
              <mui.Typography css={css.tableListTitle}>Indexes</mui.Typography>
              <mui.Box css={css.tableList}>
                {Object.keys(tables[tableId!].indexes).map((indexName) => (
                  <ListItem
                    key={indexName}
                    text={indexName}
                    setTables={setTables}
                    type="index"
                    currentTable={tableId!}
                    isUnique={tables[tableId!].indexes[indexName].isUnique}
                  />
                ))}
              </mui.Box>
            </mui.Box>
          )}

          {!!Object.keys(tables[tableId!].foreignKeys).length && (
            <mui.Box>
              <mui.Typography css={css.tableListTitle}>Foreign Keys</mui.Typography>
              <mui.Box css={css.tableList}>
                {Object.keys(tables[tableId!].foreignKeys).map((foreignKeyName) => (
                  <ListItem
                    key={foreignKeyName}
                    text={foreignKeyName}
                    setTables={setTables}
                    type="foreignKey"
                    currentTable={tableId!}
                  />
                ))}
              </mui.Box>
            </mui.Box>
          )} */}
        </mui.Box>
      ) : (
        <EmptyContainer
          title="Table doesn't exist"
          text={"You don't have a table with specified name, please create it on the main page"}
          buttonText="Go back"
          buttonAction={() => navigate('/')}
        />
      )}

      <ColumnModal open={columnModal} onClose={() => setColumnModal(ModalState.Closed)} />

      <IndexModal open={indexModal} onClose={() => setIndexModal(ModalState.Closed)} />

      {/*
      <AddIndexModal
        currentTable={tableId!}
        tables={tables}
        setTables={setTables}
        open={isAddIndexModalOpen}
        onClose={() => setIsAddIndexModalOpen(false)}
      />

      <AddForeignKeyModal
        currentTable={tableId!}
        currentColumn={addForeinKeyModal.collumnFrom}
        tables={tables}
        open={addForeinKeyModal.open}
        setTables={setTables}
        onClose={() => setAddForeignKeyModal({ open: false, collumnFrom: '' })}
      /> */}
    </mui.Box>
  );
};

export default TablePage;
