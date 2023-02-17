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
  getPrimaryColumnTypeName,
  KeyOfColumnType,
  KeyOfPrimaryColumnType,
  positiveNumberTypingValidation,
  PrimaryColumnType,
  variableNameRegex,
  variableTypingValidation,
} from '../../utils/columns';
import { useStore } from '../../store';
import Input from '../Input';
import Select from '../Select';
import { Column, ModalState } from '../../store/types';
import ColumnDefaultValueInput from '../ColumnDefaultValueInput';

interface ColumnModalProps {
  open: ModalState;
  onClose: () => void;
  column?: Column;
}

export interface ColumnModalValues {
  columnName: string;
  columnType: ColumnType | PrimaryColumnType | string;
  columnLength?: string;
  columnDefaultValue?: any;
  columnIsNullable: boolean;
}

const ColumnModal: React.FC<ColumnModalProps> = ({ open, onClose, column }) => {
  const { currentTable, addColumn, editColumn } = useStore((state) => state);

  const initialValues = useMemo<ColumnModalValues>(
    () => ({
      columnName: column?.name ?? '',
      columnType: column?.type ?? '',
      columnLength: column?.length ?? '',
      columnDefaultValue: column?.default ?? '',
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
        ...(!!values.columnDefaultValue && { default: values.columnDefaultValue }),
        primaryKey: false,
      };
      if (open === ModalState.Add) addColumn(newColumn);
      else if (open === ModalState.Edit && column) editColumn(column.name, newColumn);
      onClose();
    },
  });

  const handleDefaultValueChange = (value: string) => {
    setFieldValue('columnDefaultValue', value);
  };

  useEffect(() => {
    resetForm();
  }, [open]);

  return (
    <Modal open={!!open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>{open === ModalState.Add ? 'Creating Column' : 'Editing Column'}</mui.Typography>
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
            onChange={(e) => {
              setFieldValue('columnType', e.target.value);
              setFieldValue('columnLength', '');
              setFieldValue('columnDefaultValue', '');
            }}
            renderValue={(selected) => {
              if (selected.length) {
                return column?.primaryKey
                  ? getPrimaryColumnTypeName(selected as PrimaryColumnType)
                  : getColumnTypeName(selected as ColumnType);
              }
              return 'Choose a column type';
            }}
          >
            {column?.primaryKey
              ? (Object.keys(PrimaryColumnType) as Array<KeyOfPrimaryColumnType>).map((columnTypeName) => (
                  <mui.MenuItem key={PrimaryColumnType[columnTypeName]} value={PrimaryColumnType[columnTypeName]}>
                    {columnTypeName}
                  </mui.MenuItem>
                ))
              : (Object.keys(ColumnType) as Array<KeyOfColumnType>).map((columnTypeName) => (
                  <mui.MenuItem key={ColumnType[columnTypeName]} value={ColumnType[columnTypeName]}>
                    {columnTypeName}
                  </mui.MenuItem>
                ))}
          </Select>
        </mui.Box>

        <mui.Box>
          <Input
            label="Column Length"
            value={values.columnLength ?? ''}
            placeholder={
              !values.columnType || values.columnType !== ColumnType.String ? 'Not available for this type' : '255'
            }
            name="columnName"
            disabled={!values.columnType || values.columnType !== ColumnType.String}
            onChange={(e) => {
              setFieldValue('columnLength', positiveNumberTypingValidation(e.target.value));
            }}
          />
        </mui.Box>
      </mui.Box>

      <mui.Box css={css.twoColumnContainer}>
        <mui.Box>
          <ColumnDefaultValueInput
            value={values.columnDefaultValue}
            type={values.columnType}
            onChange={handleDefaultValueChange}
          />
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
            column?.primaryKey ||
            (!column && !!currentTable?.columns.find((column) => column.name === values.columnName))
          }
        />
      </mui.Box>
    </Modal>
  );
};

export default ColumnModal;
