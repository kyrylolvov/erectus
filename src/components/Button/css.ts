export const button: CSSWithTheme = () => ({
  background: 'var(--cta-button-color)',
  transition: 'all 0.2s ease-in-out',
  color: 'var(--main-bg-color)',
  padding: '6px 20px',
  textTransform: 'none',
  fontWeight: 'bold !important',
  fontSize: '16px',
  borderRadius: '6px',

  ':hover': {
    background: 'var(--cta-button-color)',
  },

  ':disabled': {
    background: '#22262D',
    color: '#666671',
    cursor: 'not-allowed',
  },
});
