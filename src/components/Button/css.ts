export const button: CSSWithTheme = () => ({
  background: 'var(--cta-button-color)',
  transition: 'all 0.2s ease-in-out',
  color: 'var(--main-bg-color)',
  padding: '8px 32px',
  textTransform: 'none',
  fontWeight: 'bold !important',
  fontSize: '16px',
  borderRadius: '8px',

  ':hover': {
    background: 'var(--cta-button-hover-color)',
  },
});
