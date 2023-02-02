import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import Input from '@mui/joy/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';

interface AddTableModalProps {
  open: boolean;
  onClose: () => void;
  setTables: React.Dispatch<React.SetStateAction<{}>>;
}

interface AddTableFormValues {
  tableName: string;
  primaryKeyName: string;
  primaryKeyType: 'serial' | 'bigSerial';
}

const AddTableModal: React.FC<AddTableModalProps> = ({ open, onClose, setTables }) => {
  const initialValues = useMemo<AddTableFormValues>(
    () => ({
      tableName: '',
      primaryKeyName: 'id',
      primaryKeyType: 'serial',
    }),
    [open]
  );

  const validationSchema = yup.object({
    tableName: yup.string().required("Field can't be empty"),
    primaryKeyName: yup.string().required("Field can't be empty"),
  });

  const { values, errors, handleSubmit, handleChange, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: ({ tableName, primaryKeyName, primaryKeyType }) => {
      setTables((prev) => ({
        ...prev,
        [tableName]: {
          columns: {
            [primaryKeyName]: {
              name: primaryKeyName,
              type: primaryKeyType,
              primaryKey: true,
              notNull: true,
            },
          },
        },
      }));
      onClose();
    },
  });

  useEffect(() => {
    resetForm();
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>Creating New Table</mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <mui.Typography css={css.inputLabel}>Table Name</mui.Typography>
        <Input
          value={values.tableName}
          onChange={handleChange}
          id="tableName"
          css={css.input}
          size="lg"
          placeholder="A unique table name"
        />
      </mui.Box>

      <mui.Divider css={css.divider} />

      <mui.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <mui.Box>
          <mui.Typography css={css.inputLabel}>Primary Key Name</mui.Typography>
          <Input
            value={values.primaryKeyName}
            onChange={handleChange}
            id="primaryKeyName"
            css={css.input}
            size="lg"
            placeholder="A unique column name"
          />
        </mui.Box>
        <mui.Box>
          <mui.Typography css={css.inputLabel}>Primary Key Type</mui.Typography>
          <mui.Select
            value={values.primaryKeyType}
            onChange={(e) => setFieldValue('primaryKeyType', e.target.value)}
            id="primaryKeyType"
            defaultValue="int"
            css={css.select}
          >
            <mui.MenuItem value="serial">Auto-incremented integer</mui.MenuItem>
            <mui.MenuItem value="bigSerial">Auto-incremented big integer</mui.MenuItem>
          </mui.Select>
        </mui.Box>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button
          text="Continue"
          onClick={() => handleSubmit()}
          disabled={JSON.stringify(errors) !== '{}' || values.tableName === ''}
        />
      </mui.Box>
    </Modal>
  );
};

export default AddTableModal;
