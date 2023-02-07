/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import Select from '../Select';
import { foreignKeyActions, renderSelectValue } from '../../utils/foreignKeys';
import { useStore } from '../../store';
import { Column, ForeignKey, ModalState } from '../../store/types';

interface ForeignKeyModalProps {
  open: ModalState;
  onClose: () => void;
  column?: Column;
  foreignKey?: ForeignKey;
}

interface ForeignKeyModalValues {
  name: string;
  tableFrom: string;
  columnsFrom: string;
  tableTo: string;
  columnsTo: string;
  onUpdate: 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
  onDelete: 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
}

const ForeignKeyModal: React.FC<ForeignKeyModalProps> = ({ open, onClose, column, foreignKey }) => {
  const { currentTable, tables, addForeignKey } = useStore((state) => state);

  const initialValues = useMemo<ForeignKeyModalValues>(
    () => ({
      name: open === ModalState.Edit ? foreignKey?.name! : '',
      tableFrom: open === ModalState.Edit ? currentTable?.name! : '',
      columnsFrom: column?.name ?? '',
      tableTo: open === ModalState.Edit ? foreignKey?.tableTo! : '',
      columnsTo: open === ModalState.Edit ? foreignKey?.columnsTo! : '',
      onUpdate: open === ModalState.Edit ? foreignKey?.onUpdate! : 'no action',
      onDelete: open === ModalState.Edit ? foreignKey?.onDelete! : 'no action',
    }),
    [open]
  );

  const validationSchema = yup.object({
    name: yup.string().required("Field can't be empty"),
    tableFrom: yup.string().required("Field can't be empty"),
    columnsFrom: yup.string().required("Field can't be empty"),
    tableTo: yup.string().required("Field can't be empty"),
    columnsTo: yup.string().required("Field can't be empty"),
    onUpdate: yup.string().required("Field can't be empty"),
    onDelete: yup.string().required("Field can't be empty"),
  });

  const { values, errors, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newForeignKey: ForeignKey = { ...values };
      if (open === ModalState.Add) addForeignKey(newForeignKey);
      onClose();
    },
  });

  useEffect(() => {
    resetForm();
  }, [open]);

  useEffect(() => {
    setFieldValue('name', `${values.tableFrom}_${values.columnsFrom}_${values.tableTo}_${values.columnsTo}_fk`);
  }, [values.columnsTo]);

  return (
    <Modal open={!!open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>
        {open === ModalState.Add ? 'Creating Foreign Key' : 'Editing Foreign Key'}
      </mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <Select
          label="Related table"
          value={values.tableTo}
          onChange={(e) => setFieldValue('tableTo', e.target.value)}
          renderValue={(selected) => renderSelectValue(!values.tableTo, String(selected), 'Choose a related table')}
        >
          {tables
            .filter((table) => table.name !== currentTable?.name)
            .map((filteredTable) => (
              <mui.MenuItem key={filteredTable.name} value={filteredTable.name}>
                {filteredTable.name}
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
          renderValue={(selected) =>
            renderSelectValue(
              !values.columnsTo,
              String(selected),
              'Choose a related column',
              !values.tableTo,
              'Choose a related table first'
            )
          }
        >
          {values.tableTo &&
            tables
              .find((table) => table.name === values.tableTo)
              ?.columns.filter((column) => column.primaryKey)
              .map((filteredColumn) => (
                <mui.MenuItem key={filteredColumn.name} value={filteredColumn.name}>
                  {filteredColumn.name}
                </mui.MenuItem>
              ))}
        </Select>
      </mui.Box>

      <mui.Box css={css.twoColumnContainer}>
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
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          disabled={JSON.stringify(errors) !== '{}' || !values.tableTo}
        />
      </mui.Box>
    </Modal>
  );
};

export default ForeignKeyModal;
