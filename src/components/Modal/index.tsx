import React from 'react';
import * as mui from '@mui/material';
import * as muiIcons from '@mui/icons-material';
import * as css from './css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => (
  <mui.Modal open={open} onClose={onClose}>
    <mui.Box css={css.modalContainer}>
      <mui.Box css={css.CloseButtonContainer}>
        <mui.IconButton onClick={onClose}>
          <muiIcons.Close />
        </mui.IconButton>
      </mui.Box>
      {children}
    </mui.Box>
  </mui.Modal>
);

export default Modal;
