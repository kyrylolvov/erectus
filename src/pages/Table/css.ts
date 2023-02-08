export const container: CSSWithTheme = () => ({
  padding: '32px 0',
  maxWidth: '768px',
  margin: '0 auto',
});

export const header: CSSWithTheme = () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const backButton: CSSWithTheme = () => ({
  background: '#22262D',
  transition: 'all 0.2s ease-in-out',
  color: '#C8CFD6',

  ':hover': {
    background: '#31363C',
  },
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
    background: 'var(--cta-button-color)',
  },
});

export const popoverItem: CSSWithTheme = () => ({
  color: '#CBD1D7',
  fontSize: '14px',
  cursor: 'pointer',

  ':hover': {
    color: 'var(--cta-button-color)',
  },
});

export const tableListTitle: CSSWithTheme = () => ({
  margin: '36px 0 8px 0',
  fontSize: '14px',
  color: '#666670',
  fontWeight: 600,
  textTransform: 'uppercase',
});

export const tableList: CSSWithTheme = () => ({
  display: 'grid',
  gap: '16px',
});
