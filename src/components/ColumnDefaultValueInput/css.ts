export const inputLabel: CSSWithTheme = () => ({
  fontSize: '14px',
  fontWeight: 'semi-bold',
});

export const input: CSSWithTheme = () => ({
  marginTop: '4px',
  padding: '16px 14px',
  height: '54px',
  width: '100%',
  fontFamily: 'Inter',
  fontSize: '14px',
  borderRadius: '4px',
  outline: 'none',
  border: '1px solid var(--secondary-text-color)',
  background: 'var(--main-bg-color)',
  color: 'var(--input-text-color)',
  boxSizing: 'border-box',

  ':hover:not(:focus):not(:disabled)': {
    border: '1px solid var(--input-text-color)',
  },

  ':focus': {
    outline: '1px solid var(--cta-button-color)',
    border: '1px solid var(--main-bg-color)',
  },

  ':disabled': {
    border: '1px solid #32363A',
    background: '#191B20',
    color: '#85888C',
    cursor: 'not-allowed',
  },
});
