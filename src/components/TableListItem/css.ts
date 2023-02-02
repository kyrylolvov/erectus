export const container: CSSWithTheme = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid var(--secondary-text-color)',
  borderRadius: '6px',
  transition: 'all 0.1s',

  ':hover': {
    border: '1px solid #494F57',
    background: '#171B21',
  },
});

export const text: CSSWithTheme = () => ({
  padding: '12px 0 12px 12px',
  cursor: 'pointer',
  width: '100%',
});

export const iconMore: CSSWithTheme = () => ({
  cursor: 'pointer',
  color: 'var(--secondary-text-color)',
  marginRight: '12px',

  ':hover': {
    color: 'white',
  },
});

export const deleteTable: CSSWithTheme = () => ({
  color: '#D15B6B',
  fontSize: '14px',
  cursor: 'pointer',
});
