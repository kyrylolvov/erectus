export const foreignKeyActions = [
  {
    name: 'Cascade',
    value: 'cascade',
  },
  {
    name: 'Restrict',
    value: 'restrict',
  },
  {
    name: 'No action',
    value: 'no action',
  },
  {
    name: 'Set null',
    value: 'set null',
  },
  {
    name: 'Set default',
    value: 'set default',
  },
];

export const renderSelectValue = (
  empty: boolean,
  value: string,
  placeholder: string,
  disabled?: boolean,
  disabledPlaceholder?: string
) => {
  if (empty) {
    return placeholder;
  }

  if (disabled) {
    return disabledPlaceholder;
  }

  return value;
};
