export const button =
  (width?: number): CSSWithTheme =>
  () => ({
    background: 'var(--cta-button-color)',
    transition: 'all 0.2s ease-in-out',
    color: 'var(--main-bg-color)',
    width: width ? `${width}px` : '100%',
    height: '48px',
    fontFamily: 'Inter',
    textTransform: 'none',
    fontWeight: '600 !important',
    fontSize: '14px',
    borderRadius: '6px',

    ':hover': {
      background: 'var(--cta-button-color)',
    },

    ':disabled': {
      background: '#22262D',
      color: '#666671',
    },
  });
