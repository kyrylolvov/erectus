import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import {
  ColumnType,
  getColumnTypeName,
  KeyOfColumnType,
  PrimaryColumnType,
  variableNameRegex,
  variableTypingValidation,
} from '../../utils/columns';
import { useStore } from '../../store';
import Input from '../Input';
import Select from '../Select';
import { Column, ModalState } from '../../store/types';

interface ColumnModalProps {
  open: ModalState;
  onClose: () => void;
  column?: Column;
}

interface ColumnModalValues {
  columnName: string;
  columnType: ColumnType | PrimaryColumnType | '';
  columnIsNullable: boolean;
}

const ColumnModal: React.FC<ColumnModalProps> = ({ open, onClose, column }) => {
  const { currentTable, addColumn, editColumn } = useStore((state) => state);

  const initialValues = useMemo<ColumnModalValues>(
    () => ({
      columnName: column?.name ?? '',
      columnType: column?.type ?? '',
      columnIsNullable: !column?.notNull ?? true,
    }),
    [open]
  );

  const validationSchema = yup.object({
    columnName: yup.string().required("Field can't be empty").matches(variableNameRegex),
    columnType: yup.string().required("Field can't be empty"),
    columnIsNullable: yup.boolean(),
  });

  const { values, errors, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newColumn: Column = {
        name: values.columnName,
        type: values.columnType,
        notNull: !values.columnIsNullable,
        primaryKey: false,
      };
      if (open === ModalState.Add) addColumn(newColumn);
      else if (open === ModalState.Edit && column) editColumn(column.name, newColumn);
      onClose();
    },
  });

  useEffect(() => {
    resetForm();
  }, [open]);

  return (
    <Modal open={!!open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>
        {open === ModalState.Add ? 'Creating Column' : 'Editing Column'}
      </mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <Input
          label="Column Name"
          value={values.columnName}
          placeholder="A unique column name"
          name="columnName"
          onChange={(e) => {
            setFieldValue('columnName', variableTypingValidation(e.target.value));
          }}
        />
      </mui.Box>

      <mui.Box css={css.twoColumnContainer}>
        <mui.Box>
          <Select
            label="Column Type"
            value={values.columnType}
            onChange={(e) => setFieldValue('columnType', e.target.value)}
            renderValue={(selected) =>
              selected.length ? getColumnTypeName(selected as ColumnType) : 'Choose a column type'
            }
          >
            {(Object.keys(ColumnType) as Array<KeyOfColumnType>).map((columnTypeName) => (
              <mui.MenuItem key={ColumnType[columnTypeName]} value={ColumnType[columnTypeName]}>
                {columnTypeName}
              </mui.MenuItem>
            ))}
          </Select>
        </mui.Box>

        <mui.Box
          css={css.checkboxContainer(values.columnIsNullable)}
          onClick={() => setFieldValue('columnIsNullable', !values.columnIsNullable)}
        >
          <mui.FormControlLabel
            sx={{ pointerEvents: 'none' }}
            control={<mui.Checkbox checked={values.columnIsNullable} />}
            label="Allow NULL value"
          />
        </mui.Box>
      </mui.Box>

      <mui.Box sx={{ marginTop: '36px' }}>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          disabled={
            JSON.stringify(errors) !== '{}' ||
            values.columnName === '' ||
            !!currentTable?.columns.find((column) => column.name === values.columnName)
          }
        />
      </mui.Box>
    </Modal>
  );
};

export default ColumnModal;
