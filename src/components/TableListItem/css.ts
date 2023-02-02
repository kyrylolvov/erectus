export const container: CSSWithTheme = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid var(--secondary-text-color)',
  borderRadius: '6px',
  padding: '12px',
  transition: 'all 0.1s',
  cursor: 'pointer',

  ':hover': {
    border: '1px solid #494F57',
    background: '#171B21',
  },
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
