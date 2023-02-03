export const modalTitle: CSSWithTheme = () => ({
  fontWeight: 'bold',
  fontSize: '22px',
  textAlign: 'center',
});

export const inputLabel: CSSWithTheme = () => ({
  fontSize: '14px',
  fontWeight: 'semi-bold',
});

export const twoColumnContainer: CSSWithTheme = () => ({
  marginTop: '24px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
});

export const input: CSSWithTheme = () => ({
  marginTop: '4px',
  fontFamily: 'Inter',
  borderRadius: '6px',
  fontSize: '14px',
  borderColor: 'var(--secondary-text-color)',
  height: '56px',
});

export const select =
  (isEmpty: boolean): CSSWithTheme =>
  () => ({
    marginTop: '4px',
    color: isEmpty ? '#808388' : '#CAD1D8',
    maxWidth: '230px',
    width: '100%',
    fontSize: '14px',

    svg: {
      color: '#CAD1D8',
    },

    '.MuiOutlinedInput-notchedOutline': {
      transition: 'all 0.2s',
      borderColor: 'var(--secondary-text-color)',
    },

    ':hover': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#CAD1D8',
      },
    },
  });

export const checkboxContainer =
  (isChecked: boolean): CSSWithTheme =>
  () => ({
    border: '1px solid var(--secondary-text-color)',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px',
    borderRadius: '4px',
    cursor: 'pointer',

    '.MuiTypography-root': {
      color: isChecked ? 'var(--cta-button-color) !important' : '#CAD1D8',
      fontSize: '14px',
    },

    '.MuiCheckbox-root': {
      color: isChecked ? 'var(--cta-button-color) !important' : '#666671',
      transition: 'all 0.2s',
    },

    ':hover': {
      borderColor: '#494F57',
      background: '#171B21',

      '.MuiCheckbox-root': {
        color: 'var(--cta-button-color) !important',
      },
    },
  });
