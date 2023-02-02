export const container: CSSWithTheme = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid var(--secondary-text-color)',
  borderRadius: '6px',
  padding: '12px',
});

export const iconMore: CSSWithTheme = () => ({
  cursor: 'pointer',
  color: 'var(--secondary-text-color)',

  ':hover': {
    color: 'white',
  },
});

export const deleteTable: CSSWithTheme = () => ({
  color: '#D15B6B',
  fontSize: '14px',
  cursor: 'pointer',
});
