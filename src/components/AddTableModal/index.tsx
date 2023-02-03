import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import Input from '@mui/joy/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import { GenericObject } from '../../utils/localStorage';
import { ColumnType, variableNameRegex, variableTypingValidation } from '../../utils/columns';

interface AddTableModalProps {
  open: boolean;
  onClose: () => void;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
  tables: GenericObject;
}

interface AddTableFormValues {
  tableName: string;
  primaryKeyName: string;
  primaryKeyType: 'serial' | 'bigSerial';
}

const AddTableModal: React.FC<AddTableModalProps> = ({ open, onClose, setTables, tables }) => {
  const navigate = useNavigate();

  const initialValues = useMemo<AddTableFormValues>(
    () => ({
      tableName: '',
      primaryKeyName: 'id',
      primaryKeyType: 'serial',
    }),
    [open]
  );

  const validationSchema = yup.object({
    tableName: yup.string().required("Field can't be empty").matches(variableNameRegex),
    primaryKeyName: yup.string().required("Field can't be empty").matches(variableNameRegex),
  });

  const { values, errors, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: ({ tableName, primaryKeyName, primaryKeyType }) => {
      setTables((prev) => ({
        ...prev,
        [tableName]: {
          schema: 'my_schema',
          name: tableName,
          columns: {
            [primaryKeyName]: {
              name: primaryKeyName,
              type: primaryKeyType,
              primaryKey: true,
              notNull: false,
            },
          },
          indexes: {},
          foreignKeys: {},
        },
      }));
      navigate(`/tables/${tableName}`);
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
          onChange={(e) => {
            setFieldValue('tableName', variableTypingValidation(e.target.value));
          }}
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
            onChange={(e) => {
              setFieldValue('primaryKeyName', variableTypingValidation(e.target.value));
            }}
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
            <mui.MenuItem value={ColumnType.Serial}>Auto-incremented integer</mui.MenuItem>
            <mui.MenuItem value={ColumnType.BigSerial}>Auto-incremented big integer</mui.MenuItem>
          </mui.Select>
        </mui.Box>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          disabled={JSON.stringify(errors) !== '{}' || values.tableName === '' || Object.keys(tables).includes(values.tableName)}
        />
      </mui.Box>
    </Modal>
  );
};

export default AddTableModal;
