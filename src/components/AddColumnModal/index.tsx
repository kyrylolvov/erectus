import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import Input from '@mui/joy/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import { GenericObject } from '../../utils/localStorage';
import { ColumnType, ColumnTypeName, KeyOfColumnTypeName, variableNameRegex } from '../../utils/columns';

interface AddColumnModalProps {
  open: boolean;
  onClose: () => void;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
  tables: GenericObject;
  currentTable?: string;
}

interface AddColumnModalValues {
  columnName: string;
  columnType: ColumnTypeName | '';
  columnLength: number | '';
  columnIsNullable: boolean;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({ open, onClose, setTables, tables, currentTable }) => {
  const initialValues = useMemo<AddColumnModalValues>(
    () => ({
      columnName: '',
      columnType: '',
      columnLength: '',
      columnIsNullable: true,
    }),
    [open]
  );

  const validationSchema = yup.object({
    columnName: yup.string().required("Field can't be empty").matches(variableNameRegex),
    columnType: yup.string().required("Field can't be empty"),
    columnLength: yup.number().when('columnType', {
      is: ColumnTypeName.String,
      then: yup.number().required("Field can't be empty"),
    }),
    columnIsNullable: yup.boolean(),
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
              type:
                values.columnType === ColumnTypeName.String
                  ? `${ColumnType[values.columnType as ColumnTypeName]}(${values.columnLength})`
                  : ColumnType[values.columnType as ColumnTypeName],
              primaryKey: false,
              notNull: values.columnIsNullable,
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

      <mui.Box css={css.twoColumnContainer}>
        <mui.Box>
          <mui.Typography css={css.inputLabel}>Column Type</mui.Typography>
          <mui.Select
            value={values.columnType}
            onChange={(e) => {
              setFieldValue('columnType', e.target.value);
              setFieldValue('columnLength', '');
            }}
            displayEmpty
            id="primaryKeyType"
            renderValue={(selected) => selected || 'Choose a column type'}
            MenuProps={{
              style: { maxHeight: '200px' },
            }}
            css={css.select(!values.columnType.length)}
          >
            {(Object.keys(ColumnTypeName) as Array<KeyOfColumnTypeName>).map((columnTypeName: KeyOfColumnTypeName) => (
              <mui.MenuItem key={ColumnTypeName[columnTypeName]} value={ColumnTypeName[columnTypeName]}>
                {ColumnTypeName[columnTypeName]}
              </mui.MenuItem>
            ))}
          </mui.Select>
        </mui.Box>

        <mui.Box>
          <mui.Typography css={css.inputLabel}>Column Length</mui.Typography>
          <Input
            value={values.columnLength ?? ''}
            onChange={handleChange}
            id="columnLength"
            css={css.input}
            size="lg"
            disabled={values.columnType !== ColumnTypeName.String}
            placeholder={values.columnType === ColumnTypeName.String ? '255' : 'Not available for this type'}
          />
        </mui.Box>
      </mui.Box>

      <mui.Box css={css.twoColumnContainer}>
        <mui.Box
          css={css.checkboxContainer(values.columnIsNullable)}
          onClick={() => setFieldValue('columnIsNullable', !values.columnIsNullable)}
        >
          <mui.FormControlLabel control={<mui.Checkbox checked={values.columnIsNullable} />} label="Allow NULL value" />
        </mui.Box>
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
