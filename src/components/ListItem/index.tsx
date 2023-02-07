/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as css from './css';
import { ListItemProps } from './utils';
import { useStore } from '../../store';
import { ModalState } from '../../store/types';
import ColumnModal from '../ColumnModal';
import IndexModal from '../IndexModal';

const ListItem: React.FC<ListItemProps> = ({
  text,
  type,
  isPrimaryKey,
  isInteger,
  isUnique,
  foreignKey,
  openAddKeyModal,
}) => {
  const navigate = useNavigate();
  const { currentTable, deleteTable, deleteColumn, deleteIndex } = useStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const [columnModal, setColumnModal] = useState(ModalState.Closed);
  const [indexModal, setIndexModal] = useState(ModalState.Closed);

  const deleteItem = () => {
    switch (type) {
      case 'index': {
        deleteIndex(text);
        break;
      }
      case 'column': {
        deleteColumn(text);
        break;
      }
      case 'table':
      default: {
        deleteTable(text);
        break;
      }
    }
    setAnchorEl(null);
  };

  const renderPopoverButton = () => {
    switch (type) {
      case 'index':
        return (
          <mui.Typography css={css.deleteItem()} onClick={deleteItem}>
            Delete Index
          </mui.Typography>
        );
      case 'column':
        return (
          <mui.Typography css={css.deleteItem(isPrimaryKey)} onClick={deleteItem}>
            Delete Column
          </mui.Typography>
        );
      case 'table':
      default:
        return (
          <mui.Typography css={css.deleteItem()} onClick={deleteItem}>
            Delete Table
          </mui.Typography>
        );
    }
  };

  const renderItemIcons = () => {
    switch (type) {
      case 'column':
        return (
          <mui.Box>
            {isPrimaryKey && (
              <mui.Tooltip title="Primary key" placement="top">
                <muiIcons.VpnKey css={css.columnIcon} />
              </mui.Tooltip>
            )}

            {!!foreignKey && (
              <mui.Tooltip title={`Foreign key -> ${foreignKey}`} placement="top">
                <muiIcons.VpnKeyOutlined css={css.columnIcon} />
              </mui.Tooltip>
            )}
          </mui.Box>
        );
      case 'index':
      default: {
        return (
          <mui.Box>
            {isUnique && (
              <mui.Tooltip title="Unique index" placement="top">
                <muiIcons.Star css={css.columnIcon} />
              </mui.Tooltip>
            )}
          </mui.Box>
        );
      }
    }
  };

  return (
    <mui.Box css={css.container}>
      <mui.Box css={css.itemContent}>
        <mui.Typography
          onClick={() => {
            if (type === 'table') navigate(`/tables/${text}`);
            else if (type === 'column') setColumnModal(ModalState.Edit);
            else if (type === 'index') setIndexModal(ModalState.Edit);
          }}
          css={css.text}
        >
          {text}
        </mui.Typography>
        {renderItemIcons()}
      </mui.Box>
      <muiIcons.MoreVert css={css.iconMore} onClick={(e) => setAnchorEl(e.currentTarget)} />
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
        {renderPopoverButton()}
      </mui.Popover>

      <ColumnModal
        open={columnModal}
        onClose={() => setColumnModal(ModalState.Closed)}
        column={currentTable?.columns.find((column) => column.name === text)}
      />

      <IndexModal
        open={indexModal}
        onClose={() => setIndexModal(ModalState.Closed)}
        index={currentTable?.indexes.find((index) => index.name === text)}
      />
    </mui.Box>
  );
};

export default ListItem;
