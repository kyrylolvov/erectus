export const container: CSSWithTheme = () => ({
  padding: '32px 0',
  height: '100vh',
  maxWidth: '768px',
  margin: '0 auto',
});

export const header: CSSWithTheme = () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const title: CSSWithTheme = () => ({
  fontSize: '24px',
  fontWeight: 'bold',
});

export const addButton: CSSWithTheme = () => ({
  background: 'var(--cta-button-color)',
  transition: 'all 0.2s ease-in-out',
  color: 'var(--main-bg-color)',

  ':hover': {
    background: 'var(--cta-button-hover-color)',
  },
});

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
