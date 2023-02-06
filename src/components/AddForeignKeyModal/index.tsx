/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import * as mui from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import { GenericObject } from '../../utils/localStorage';
import Select from '../Select';
import { foreignKeyActions, renderSelectValue } from '../../utils/foreignKeys';

interface AddForeignKeyModalProps {
  open: boolean;
  onClose: () => void;
  setTables: React.Dispatch<React.SetStateAction<GenericObject>>;
  tables: GenericObject;
  currentTable: string;
  currentColumn: string;
}

interface AddForeignKeyModalValues {
  name: string;
  tableFrom: string;
  columnsFrom: string;
  tableTo: string;
  columnsTo: string;
  onUpdate: 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
  onDelete: 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
}

const AddForeignKeyModal: React.FC<AddForeignKeyModalProps> = ({ open, onClose, setTables, tables, currentTable, currentColumn }) => {
  const initialValues: AddForeignKeyModalValues = {
    name: '',
    tableFrom: currentTable,
    columnsFrom: currentColumn,
    tableTo: '',
    columnsTo: '',
    onUpdate: 'no action',
    onDelete: 'no action',
  };

  const validationSchema = yup.object({
    columnNames: yup.array().of(yup.string()),
  });

  const { values, errors, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
      // setTables((prev) => ({
      //   ...prev,
      //   [currentTable!]: {
      //     ...prev[currentTable!],
      //     indexes: {
      //       ...prev[currentTable!].indexes,
      //       [values.name]: {
      //         name: values.name,
      //         columns: values.columns,
      //         isUnique: values.isUnique,
      //       },
      //     },
      //   },
      // }));
      // onClose();
    },
  });

  useEffect(() => {
    resetForm();
  }, [open]);

  console.log(values);

  return (
    <Modal open={open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>Creating Foreign Key</mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <Select
          label="Related table"
          value={values.tableTo}
          onChange={(e) => setFieldValue('tableTo', e.target.value)}
          renderValue={(selected) => (selected.length ? selected : 'Choose a related table')}
        >
          {Object.keys(tables)
            .filter((table) => table !== currentTable)
            .map((tableName) => (
              <mui.MenuItem key={tableName} value={tableName}>
                {tableName}
              </mui.MenuItem>
            ))}
        </Select>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px' }}>
        <Select
          disabled={!values.tableTo}
          label="Related column"
          value={values.columnsTo}
          onChange={(e) => setFieldValue('columnsTo', e.target.value)}
          renderValue={(selected) => (selected.length ? selected : values.tableTo ? 'Choose a related column' : 'Choose a related table first')}
        >
          {values.tableTo &&
            Object.keys(tables[values.tableTo].columns)
              .filter((column) => tables[values.tableTo].columns[column].primaryKey)
              .map((columnName) => (
                <mui.MenuItem key={columnName} value={columnName}>
                  {columnName}
                </mui.MenuItem>
              ))}
        </Select>
      </mui.Box>

      <mui.Box css={css.twoColumnContainer}>
        <Select
          disabled={!values.tableTo}
          label="On Update"
          value={values.onUpdate}
          onChange={(e) => setFieldValue('onUpdate', e.target.value)}
          renderValue={(selected) =>
            renderSelectValue(
              !values.onUpdate,
              foreignKeyActions.find((x) => x.value === selected)?.name ?? '',
              'Choose an on update action',
              !values.tableTo,
              'Choose a related table first'
            )
          }
        >
          {foreignKeyActions.map((action) => (
            <mui.MenuItem key={`onupdate-${action.value}`} value={action.value}>
              {action.name}
            </mui.MenuItem>
          ))}
        </Select>

        <Select
          disabled={!values.tableTo}
          label="On Delete"
          value={values.onDelete}
          onChange={(e) => setFieldValue('onDelete', e.target.value)}
          renderValue={(selected) =>
            renderSelectValue(
              !values.onDelete,
              foreignKeyActions.find((x) => x.value === selected)?.name ?? '',
              'Choose an on delete action',
              !values.tableTo,
              'Choose a related table first'
            )
          }
        >
          {foreignKeyActions.map((action) => (
            <mui.MenuItem key={`ondelete-${action.value}`} value={action.value}>
              {action.name}
            </mui.MenuItem>
          ))}
        </Select>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button text="Submit" onClick={() => handleSubmit()} disabled={JSON.stringify(errors) !== '{}'} />
      </mui.Box>
    </Modal>
  );
};

export default AddForeignKeyModal;
