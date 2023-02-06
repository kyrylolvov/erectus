/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as css from './css';
import { GenericObject } from '../../utils/localStorage';
import { ListItemProps } from './utils';

const ListItem: React.FC<ListItemProps> = ({
  text,
  type,
  isPrimaryKey,
  isInteger,
  isUnique,
  foreignKey,
  currentTable,
  openAddKeyModal,
  setTables,
}) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const deleteTable = () => {
    setTables((prev: GenericObject) => {
      prev[text] = undefined;
      return JSON.parse(JSON.stringify(prev));
    });
    setAnchorEl(null);
  };

  const deleteColumn = () => {
    setTables((prev: GenericObject) => {
      prev[currentTable!].columns[text] = undefined;
      return JSON.parse(JSON.stringify(prev));
    });
    setAnchorEl(null);
  };

  const deleteIndex = () => {
    setTables((prev: GenericObject) => {
      prev[currentTable!].indexes[text] = undefined;
      return JSON.parse(JSON.stringify(prev));
    });
    setAnchorEl(null);
  };

  const deleteForeignKey = () => {
    setTables((prev: GenericObject) => {
      prev[currentTable!].foreignKeys[text] = undefined;
      return JSON.parse(JSON.stringify(prev));
    });
    setAnchorEl(null);
  };

  const renderPopoverButton = () => {
    switch (type) {
      case 'column':
        return (
          <>
            <mui.Typography css={css.deleteTable(isPrimaryKey)} onClick={deleteColumn}>
              Delete Column
            </mui.Typography>
            <mui.Typography
              css={css.popoverItem(!isInteger || !!foreignKey)}
              onClick={() => (isInteger && !foreignKey ? openAddKeyModal(text) : {})}
              sx={{ marginTop: '4px' }}
            >
              Add Foreign Key
            </mui.Typography>
          </>
        );
      case 'index':
        return (
          <mui.Typography css={css.deleteTable(false)} onClick={deleteIndex}>
            Delete Index
          </mui.Typography>
        );
      case 'foreignKey':
        return (
          <mui.Typography css={css.deleteTable(false)} onClick={deleteForeignKey}>
            Delete Foreign Key
          </mui.Typography>
        );
      default:
        return (
          <mui.Typography css={css.deleteTable(false)} onClick={deleteTable}>
            Delete Table
          </mui.Typography>
        );
    }
  };

  return (
    <mui.Box css={css.container}>
      <mui.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingRight: '16px',
        }}
      >
        <mui.Typography
          onClick={() => {
            if (type === 'table') navigate(`/tables/${text}`);
          }}
          css={css.text}
        >
          {text}
        </mui.Typography>
        {type === 'column' && (
          <mui.Box>
            {isPrimaryKey && (
              <mui.Tooltip title="Primary key" placement="top">
                <muiIcons.VpnKeyOutlined css={css.columnIcon} />
              </mui.Tooltip>
            )}

            {!!foreignKey && (
              <mui.Tooltip title={`Foreign key -> ${foreignKey}`} placement="top">
                <muiIcons.LockOutlined css={css.columnIcon} />
              </mui.Tooltip>
            )}
          </mui.Box>
        )}

        {type === 'index' && (
          <mui.Box>
            {isUnique && (
              <mui.Tooltip title="Unique index" placement="top">
                <muiIcons.StarOutline css={css.columnIcon} />
              </mui.Tooltip>
            )}
          </mui.Box>
        )}
      </mui.Box>
      <muiIcons.MoreVert css={css.iconMore} onClick={(e) => setAnchorEl(e.currentTarget)} />
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
        {renderPopoverButton()}
      </mui.Popover>
    </mui.Box>
  );
};

export default ListItem;
