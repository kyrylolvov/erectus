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

export const itemContent: CSSWithTheme = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingRight: '16px',
});

export const text: CSSWithTheme = () => ({
  padding: '12px 0 12px 12px',
  cursor: 'pointer',
  width: '100%',
});

export const columnIcon: CSSWithTheme = () => ({
  color: 'var(--secondary-text-color)',
  marginTop: '2px',
  width: '18px',
});

export const iconMore: CSSWithTheme = () => ({
  cursor: 'pointer',
  color: 'var(--secondary-text-color)',
  marginRight: '12px',

  ':hover': {
    color: 'white',
  },
});

export const popoverItem =
  (disabled: boolean): CSSWithTheme =>
  () => ({
    color: disabled ? '#666670' : '#CBD1D7',
    fontSize: '14px',
    cursor: disabled ? 'not-allowed' : 'pointer',

    ':hover': {
      color: disabled ? '#666670' : 'var(--cta-button-color)',
    },
  });

export const deleteItem =
  (disabled?: boolean): CSSWithTheme =>
  () => ({
    color: disabled ? '#666670' : '#D15B6B',
    fontSize: '14px',
    cursor: disabled ? 'help' : 'pointer',
  });
