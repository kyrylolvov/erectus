export const emptyContainer: CSSWithTheme = () => ({
  marginTop: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '.MuiTypography-subtitle1': {
    marginTop: '16px',
    fontWeight: 'bold',
    fontSize: '24px',
  },

  '.MuiTypography-body1': {
    width: '300px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'semid-bold',
    color: 'var(--secondary-text-color)',
  },
});

export const cubeIconContainer: CSSWithTheme = () => ({
  background: 'var(--secondary-bg-color)',
  borderRadius: '50%',
  height: '96px',
  width: '96px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: '36px',
    width: '36px',
    color: 'var(--secondary-text-color)',
  },
});
