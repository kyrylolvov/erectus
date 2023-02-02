import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import Input from '@mui/joy/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import { GenericObject } from '../../utils/localStorage';
import { variableNameRegex } from '../../utils/columns';

interface AddColumnModalProps {
  open: boolean;
  onClose: () => void;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
  tables: GenericObject;
  currentTable?: string;
}

interface AddColumnModalValues {
  columnName: string;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({ open, onClose, setTables, tables, currentTable }) => {
  const initialValues = useMemo<AddColumnModalValues>(
    () => ({
      columnName: '',
    }),
    [open]
  );

  const validationSchema = yup.object({
    columnName: yup.string().required("Field can't be empty").matches(variableNameRegex),
  });

  const { values, errors, handleSubmit, handleChange, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      setTables((prev) => ({
        ...prev,
        [currentTable!]: {
          columns: {
            ...prev[currentTable!].columns,
            [values.columnName]: {
              name: values.columnName,
              type: 'string',
              primaryKey: false,
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
      <mui.Typography css={css.modalTitle}>Creating Column</mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <mui.Typography css={css.inputLabel}>Column Name</mui.Typography>
        <Input
          value={values.columnName}
          onChange={handleChange}
          id="columnName"
          css={css.input}
          size="lg"
          placeholder="A unique column name"
        />
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          disabled={
            JSON.stringify(errors) !== '{}' ||
            values.columnName === '' ||
            Object.keys(tables[currentTable!].columns).includes(values.columnName)
          }
        />
      </mui.Box>
    </Modal>
  );
};

export default AddColumnModal;
