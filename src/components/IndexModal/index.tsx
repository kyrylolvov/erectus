import React, { useEffect, useMemo } from 'react';
import * as mui from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import * as css from './css';
import Button from '../Button';
import Input from '../Input';
import { useStore } from '../../store';
import Select from '../Select';
import { Index, ModalState } from '../../store/types';
import { arraysEqual } from '../../utils/indexes';

interface IndexModalProps {
  open: ModalState;
  onClose: () => void;
  index?: Index;
}

interface IndexModalValues {
  columns: string[];
  isUnique: boolean;
  name: string;
}

const IndexModal: React.FC<IndexModalProps> = ({ open, onClose, index }) => {
  const { currentTable, addIndex, editIndex } = useStore((state) => state);

  const initialValues = useMemo<IndexModalValues>(
    () => ({
      columns: index?.columns ?? [],
      isUnique: index?.isUnique ?? true,
      name: index?.name ?? '',
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
    enableReinitialize: true,
    onSubmit: (values) => {
      const newIndex: Index = {
        name: values.name,
        columns: values.columns,
        isUnique: values.isUnique,
      };
      if (open === ModalState.Add) addIndex(newIndex);
      else if (open === ModalState.Edit && index) editIndex(index.name, newIndex);

      onClose();
    },
  });

  useEffect(() => {
    resetForm();
  }, [open]);

  useEffect(() => {
    setFieldValue('name', values.columns.length ? `${currentTable?.name}_${values.columns.join('_')}_index` : '');
  }, [values.columns]);

  return (
    <Modal open={!!open} onClose={onClose}>
      <mui.Typography css={css.modalTitle}>{open === ModalState.Add ? 'Creating Index' : 'Editing index'}</mui.Typography>
      <mui.Box sx={{ marginTop: '24px' }}>
        <Select
          label="Columns"
          value={values.columns}
          onChange={(e) => setFieldValue('columns', e.target.value)}
          multiple
          renderValue={(selected) => (selected.length ? (selected as string[]).join(', ') : 'Choose columns to index')}
        >
          {currentTable?.columns.map((column) => (
            <mui.MenuItem key={column.name} value={column.name}>
              {column.name}
            </mui.MenuItem>
          ))}
        </Select>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px' }}>
        <Input label="Index name" value={values.name} disabled placeholder="Automatically generated from selected columns" />
      </mui.Box>

      <mui.Box css={css.twoColumnContainer}>
        <mui.Box css={css.checkboxContainer(values.isUnique)} onClick={() => setFieldValue('isUnique', !values.isUnique)}>
          <mui.FormControlLabel
            sx={{ pointerEvents: 'none' }}
            control={<mui.Checkbox checked={values.isUnique} />}
            label="Unique index"
          />
        </mui.Box>
      </mui.Box>

      <mui.Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          disabled={
            JSON.stringify(errors) !== '{}' ||
            !values.columns.length ||
            (!index && !!currentTable?.indexes.some((index) => arraysEqual(index.columns, values.columns)))
          }
        />
      </mui.Box>
    </Modal>
  );
};

// Object.keys(tables[currentTable].indexes)
//               .map((tableIndex) => tables[currentTable].indexes[tableIndex].columns)
//               .some((columnIndex) => arraysEqual(columnIndex.sort(), values.columns.sort())

export default IndexModal;
