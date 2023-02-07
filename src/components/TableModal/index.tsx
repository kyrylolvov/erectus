import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import { PrimaryColumnType, variableNameRegex, variableTypingValidation } from '../../utils/columns';
import Input from '../Input';
import Select from '../Select';
import { useStore } from '../../store';
import { ModalState, Table } from '../../store/types';

interface TableModalProps {
  open: ModalState;
  onClose: () => void;
}
interface AddTableFormValues {
  tableName: string;
  primaryKeyName: string;
  primaryKeyType: PrimaryColumnType;
}

const TableModal: React.FC<TableModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { tables, addTable } = useStore((state) => state);

  const initialValues = useMemo<AddTableFormValues>(
    () => ({
      tableName: '',
      primaryKeyName: 'id',
      primaryKeyType: PrimaryColumnType.Serial,
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
      const table: Table = {
        name: tableName,
        columns: [
          {
            name: primaryKeyName,
            type: primaryKeyType,
            primaryKey: true,
            notNull: false,
          },
        ],
        indexes: [],
        foreignKeys: [],
      };
      addTable(table);
      navigate(`/tables/${tableName}`);
      onClose();
    },
  });

  useEffect(() => {
    resetForm();
  }, [open]);

  return (
    <Modal open={!!open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>Creating New Table</mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <Input
          label="Table Name"
          name="tableName"
          value={values.tableName}
          placeholder="A unique table name"
          onChange={(e) => setFieldValue('tableName', variableTypingValidation(e.target.value))}
        />
      </mui.Box>

      <mui.Divider css={css.divider} />

      <mui.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <mui.Box>
          <Input
            label="Primary Key Name"
            name="primaryKeyName"
            value={values.primaryKeyName}
            placeholder="A unique column name"
            onChange={(e) => setFieldValue('primaryKeyName', variableTypingValidation(e.target.value))}
          />
        </mui.Box>
        <mui.Box>
          <Select
            label="Primary Key Type"
            value={values.primaryKeyType}
            onChange={(e) => setFieldValue('primaryKeyType', e.target.value)}
          >
            <mui.MenuItem value={PrimaryColumnType.Serial}>Auto-incremented integer</mui.MenuItem>
            <mui.MenuItem value={PrimaryColumnType.BigSerial}>Auto-incremented big integer</mui.MenuItem>
          </Select>
        </mui.Box>
      </mui.Box>

      <mui.Box sx={{ marginTop: '36px' }}>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          disabled={
            JSON.stringify(errors) !== '{}' ||
            values.tableName === '' ||
            !!tables.find((table) => table.name === values.tableName)
          }
        />
      </mui.Box>
    </Modal>
  );
};

export default TableModal;
