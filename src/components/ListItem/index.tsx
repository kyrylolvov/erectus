/* eslint-disable no-param-reassign */
import React from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as css from './css';
import { GenericObject } from '../../utils/localStorage';

interface ListItemProps {
  text: string;
  type: 'table' | 'column';
  isPrimaryKey?: boolean;
  setTables: React.Dispatch<GenericObject>;
}

const ListItem: React.FC<ListItemProps> = ({ text, type, isPrimaryKey, setTables }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  const deleteTable = () => {
    setTables((prev: GenericObject) => {
      prev[text] = undefined;
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
          css={css.deleteTable}
          onClick={() => {
            if (type === 'table') deleteTable();
          }}
        >
          {type === 'table' ? 'Delete Table' : 'Delete Field'}
        </mui.Typography>
      </mui.Popover>
    </mui.Box>
  );
};

export default ListItem;
