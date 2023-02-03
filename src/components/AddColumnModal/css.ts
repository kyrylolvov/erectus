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
