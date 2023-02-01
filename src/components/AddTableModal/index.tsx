import React from 'react';
import * as mui from '@mui/material';
import Input from '@mui/joy/Input';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';

interface AddTableModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTableModal: React.FC<AddTableModalProps> = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <mui.Typography css={css.modalTitle}>Creating New Table</mui.Typography>
    <mui.Box sx={{ marginTop: '24px' }}>
      <mui.Typography css={css.inputLabel}>Table Name</mui.Typography>
      <Input css={css.input} size="lg" placeholder="A unique table name" />
    </mui.Box>

    <mui.Divider css={css.divider} />

    <mui.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <mui.Box>
        <mui.Typography css={css.inputLabel}>Primary Key Name</mui.Typography>
        <Input css={css.input} size="lg" placeholder="A unique column name" />
      </mui.Box>
      <mui.Box>
        <mui.Typography css={css.inputLabel}>Primary Key Type</mui.Typography>
        <mui.Select defaultValue="int" css={css.select}>
          <mui.MenuItem value="int">Auto-incremented integer</mui.MenuItem>
          <mui.MenuItem value="bigInt">Auto-incremented big integer</mui.MenuItem>
        </mui.Select>
      </mui.Box>
    </mui.Box>

    <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
      <Button text="Continue" onClick={() => {}} />
    </mui.Box>
  </Modal>
);

export default AddTableModal;
