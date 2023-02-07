export const inputLabel: CSSWithTheme = () => ({
  fontSize: '14px',
  fontWeight: 'semi-bold',
});

export const selectField =
  (isEmpty: boolean): CSSWithTheme =>
  () => ({
    width: '100%',
    marginTop: '4px',

    '.MuiOutlinedInput-root': {
      width: '100%',
      color: isEmpty ? '#7A7C80' : '#CAD1D8',
      fontSize: '14px',
      transition: 'all 0.2s',
      height: '54px',
      boxSizing: 'border-box',

      svg: {
        color: '#7A7C80',
      },

      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#666670',
      },

      ':hover': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: '#CAD1D8',
        },
      },
    },

    '.Mui-disabled': {
      color: '#84888D',
      cursor: 'not-allowed !important',

      '.MuiSelect-select': {
        textFillColor: 'unset',
        background: '#181B20',
      },

      svg: {
        display: 'none',
      },

      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#31363A !important',
      },
    },
  });
