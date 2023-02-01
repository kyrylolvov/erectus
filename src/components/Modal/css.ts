export const modalContainer: CSSWithTheme = () => ({
  backgroundColor: 'var(--main-bg-color)',
  outline: 'none',
  borderRadius: '6px',
  width: '550px',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  boxSizing: 'border-box',
  padding: '32px',

  top: '50%',
  left: '50%',
});

export const CloseButtonContainer: CSSWithTheme = () => ({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '-16px -16px auto auto',

  '& button': {
    '& svg': {
      color: 'var(--secondary-text-color)',
      height: '1.25rem',
    },
  },
});
