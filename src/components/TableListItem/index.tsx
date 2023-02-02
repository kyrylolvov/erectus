/* eslint-disable no-param-reassign */
import React from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as css from './css';
import { GenericObject } from '../../utils/localStorage';

interface TableListItemProps {
  tableName: string;
  setTables: React.Dispatch<GenericObject>;
}

const TableListItem: React.FC<TableListItemProps> = ({ tableName, setTables }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  return (
    <mui.Box css={css.container} onClick={() => navigate(`/tables/${tableName}`)}>
      <mui.Typography>{tableName}</mui.Typography>
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
            setTables((prev: GenericObject) => {
              prev[tableName] = undefined;
              return JSON.parse(JSON.stringify(prev));
            });
            setAnchorEl(null);
          }}
        >
          Delete Table
        </mui.Typography>
      </mui.Popover>
    </mui.Box>
  );
};

export default TableListItem;
