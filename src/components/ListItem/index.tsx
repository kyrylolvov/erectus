/* eslint-disable no-param-reassign */
import React from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as css from './css';
import { GenericObject } from '../../utils/localStorage';

interface IListItem {
  text: string;
  setTables: React.Dispatch<GenericObject>;
}
interface IColumnItemProps extends IListItem {
  type: 'column';
  isPrimaryKey: boolean;
  currentTable: string;
}

interface ITableItemProps extends IListItem {
  type: 'table';
  isPrimaryKey?: boolean;
  currentTable?: string;
}

type ListItemProps = IColumnItemProps | ITableItemProps;

const ListItem: React.FC<ListItemProps> = ({ text, type, isPrimaryKey, currentTable, setTables }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

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
        <mui.Typography
          css={css.deleteTable(type === 'column' && isPrimaryKey)}
          onClick={() => {
            if (type === 'table') deleteTable();
            else if (type === 'column' && !isPrimaryKey) deleteColumn();
          }}
        >
          {type === 'table' ? 'Delete Table' : 'Delete Field'}
        </mui.Typography>
      </mui.Popover>
    </mui.Box>
  );
};

export default ListItem;
