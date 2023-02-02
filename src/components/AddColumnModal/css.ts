export const modalTitle: CSSWithTheme = () => ({
  fontWeight: 'bold',
  fontSize: '22px',
  textAlign: 'center',
});

export const inputLabel: CSSWithTheme = () => ({
  fontSize: '14px',
  fontWeight: 'semi-bold',
});

export const input: CSSWithTheme = () => ({
  marginTop: '4px',
  fontFamily: 'Inter',
  borderRadius: '6px',
  borderColor: 'var(--secondary-text-color)',
  height: '56px',
});

export const select: CSSWithTheme = () => ({
  marginTop: '4px',
  color: '#CAD1D8',
  maxWidth: '230px',

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
