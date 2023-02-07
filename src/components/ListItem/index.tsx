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

const ListItem: React.FC<ListItemProps> = ({ text, type, isPrimaryKey, isInteger, isUnique, foreignKey, openAddKeyModal }) => {
  const navigate = useNavigate();
  const { deleteTable, currentTable } = useStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const [columnModal, setColumnModal] = useState(ModalState.Closed);

  const deleteItem = () => {
    switch (type) {
      case 'table':
      default: {
        deleteTable(text);
      }
    }
    setAnchorEl(null);
  };

  const renderPopoverButton = () => {
    switch (type) {
      case 'table':
      default:
        return (
          <mui.Typography css={css.deleteitem()} onClick={deleteItem}>
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
                <muiIcons.Fingerprint css={css.columnIcon} />
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
    </mui.Box>
  );
};

export default ListItem;
