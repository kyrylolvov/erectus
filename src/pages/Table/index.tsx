import React, { useEffect, useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import * as css from './css';
import { GenericObject, saveTables } from '../../utils/localStorage';
import EmptyContainer from '../../components/EmptyContainer';
import ListItem from '../../components/ListItem';
import AddColumnModal from '../../components/AddColumnModal';
import AddIndexModal from '../../components/AddIndexModal';

interface TablePageProps {
  tables: GenericObject;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
}

const Table: React.FC<TablePageProps> = ({ tables, setTables }) => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [isAddIndexModalOpen, setIsAddIndexModalOpen] = useState(false);
  const [isAddKeyModalOpen, setIsAddKeyModalOpen] = useState(false);

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
          <>
            <mui.IconButton css={css.addButton} onClick={(e) => setAnchorEl(e.currentTarget)}>
              <muiIcons.Add />
            </mui.IconButton>
            <mui.Popover
              open={Boolean(anchorEl)}
              id="delete-table-popover"
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
                  setIsAddColumnModalOpen(true);
                  setAnchorEl(null);
                }}
              >
                Add column
              </mui.Typography>
              <mui.Typography
                sx={{ marginTop: '4px' }}
                css={css.popoverItem}
                onClick={() => {
                  setIsAddIndexModalOpen(true);
                  setAnchorEl(null);
                }}
              >
                Add index
              </mui.Typography>
              <mui.Typography
                sx={{ marginTop: '4px' }}
                css={css.popoverItem}
                onClick={() => {
                  setIsAddKeyModalOpen(true);
                  setAnchorEl(null);
                }}
              >
                Add foreign key
              </mui.Typography>
            </mui.Popover>
          </>
        )}
      </mui.Box>

      {tables[tableId!] ? (
        <mui.Box>
          <mui.Typography css={css.tableListTitle}>Columns</mui.Typography>
          <mui.Box css={css.tableList}>
            {Object.keys(tables[tableId!].columns).map((columnName) => (
              <ListItem
                key={columnName}
                text={columnName}
                setTables={setTables}
                type="column"
                currentTable={tableId!}
                isPrimaryKey={tables[tableId!].columns[columnName].primaryKey}
              />
            ))}
          </mui.Box>

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
        </mui.Box>
      ) : (
        <EmptyContainer
          title="Table doesn't exist"
          text={"You don't have a table with specified name, please create it on the main page"}
          buttonText="Go back"
          buttonAction={() => navigate('/')}
        />
      )}

      <AddColumnModal
        currentTable={tableId!}
        tables={tables}
        setTables={setTables}
        open={isAddColumnModalOpen}
        onClose={() => setIsAddColumnModalOpen(false)}
      />

      <AddIndexModal
        currentTable={tableId!}
        tables={tables}
        setTables={setTables}
        open={isAddIndexModalOpen}
        onClose={() => setIsAddIndexModalOpen(false)}
      />
    </mui.Box>
  );
};

export default Table;
