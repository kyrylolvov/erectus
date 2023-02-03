import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '@mui/joy/Input';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import { GenericObject } from '../../utils/localStorage';
import { arraysEqual } from '../../utils/indexes';

interface AddIndexModalProps {
  open: boolean;
  onClose: () => void;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
  tables: GenericObject;
  currentTable: string;
}

interface AddIndexModalValues {
  columns: string[];
  isUnique: boolean;
  name: string;
}

const AddIndexModal: React.FC<AddIndexModalProps> = ({ open, onClose, setTables, tables, currentTable }) => {
  const initialValues = useMemo<AddIndexModalValues>(
    () => ({
      columns: [],
      isUnique: true,
      name: '',
    }),
    [open]
  );

  const validationSchema = yup.object({
    columnNames: yup.array().of(yup.string()),
  });

  const { values, errors, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      setTables((prev) => ({
        ...prev,
        [currentTable!]: {
          ...prev[currentTable!],
          indexes: {
            ...prev[currentTable!].indexes,
            [values.name]: {
              name: values.name,
              columns: values.columns,
              isUnique: values.isUnique,
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

  useEffect(() => {
    setFieldValue('name', values.columns.length ? `${currentTable}_${values.columns.join('_')}_index` : '');
  }, [values.columns]);

  return (
    <Modal open={open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>Creating Index</mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <mui.Typography css={css.inputLabel}>Columns</mui.Typography>
        <mui.Select
          value={values.columns}
          onChange={(e) => {
            setFieldValue('columns', e.target.value);
          }}
          multiple
          displayEmpty
          renderValue={(selected) => (selected.length ? selected.join(', ') : 'Choose columns to index')}
          MenuProps={{
            style: { maxHeight: '200px' },
          }}
          css={css.select(!values.columns.length)}
        >
          {Object.keys(tables[currentTable].columns)
            .filter((column) => !tables[currentTable].columns[column].primaryKey)
            .map((columnName) => (
              <mui.MenuItem key={columnName} value={columnName}>
                {columnName}
              </mui.MenuItem>
            ))}
        </mui.Select>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px' }}>
        <mui.Typography css={css.inputLabel}>Index name</mui.Typography>
        <Input value={values.name} css={css.input} disabled size="lg" placeholder="Automatically generated from selected columns" />
      </mui.Box>

      <mui.Box css={css.twoColumnContainer}>
        <mui.Box css={css.checkboxContainer(values.isUnique)} onClick={() => setFieldValue('isUnique', !values.isUnique)}>
          <mui.FormControlLabel sx={{ pointerEvents: 'none' }} control={<mui.Checkbox checked={values.isUnique} />} label="Unique index" />
        </mui.Box>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          disabled={
            JSON.stringify(errors) !== '{}' ||
            !values.columns.length ||
            Object.keys(tables[currentTable].indexes)
              .map((tableIndex) => tables[currentTable].indexes[tableIndex].columns)
              .some((columnIndex) => arraysEqual(columnIndex.sort(), values.columns.sort()))
          }
        />
      </mui.Box>
    </Modal>
  );
};

export default AddIndexModal;
