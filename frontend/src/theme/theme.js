import { createTheme, alpha } from '@mui/material/styles';

const PINK = {
  50:  '#FFF0F6',
  100: '#FFD6EA',
  200: '#FFB3D6',
  300: '#FF80B5',
  400: '#FF4D94',
  500: '#FF1A73',
  600: '#E6005C',
  700: '#B30047',
  800: '#800033',
  900: '#4D001F',
};

const VIOLET = {
  50:  '#F3EFFE',
  100: '#E0D4FC',
  200: '#C5AEFA',
  300: '#A07DF5',
  400: '#7C4FEF',
  500: '#5C24E8',
  600: '#4A18CC',
  700: '#3910A3',
  800: '#280B78',
  900: '#17064D',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: PINK[400],
      light: PINK[200],
      dark: PINK[600],
      contrastText: '#fff',
    },
    secondary: {
      main: VIOLET[400],
      light: VIOLET[200],
      dark: VIOLET[600],
      contrastText: '#fff',
    },
    background: {
      default: '#0D0818',
      paper: '#140D24',
    },
    text: {
      primary: '#F5EEF8',
      secondary: '#B89FC8',
      disabled: '#6B5880',
    },
    divider: alpha(VIOLET[300], 0.15),
    error:   { main: '#FF6B9D' },
    success: { main: '#4FFFB0' },
    warning: { main: '#FFB84D' },
    info:    { main: VIOLET[300] },
  },

  typography: {
    fontFamily: '"Playfair Display", "DM Sans", Georgia, serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h5: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600 },
    body1: { fontFamily: '"DM Sans", sans-serif', lineHeight: 1.7 },
    body2: { fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6 },
    button: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600, letterSpacing: '0.04em' },
    overline: { fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em', fontWeight: 700 },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#0D0818',
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% -10%, ${alpha(VIOLET[600], 0.35)} 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 110%, ${alpha(PINK[600], 0.25)} 0%, transparent 55%)
          `,
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        '*::-webkit-scrollbar': {
          width: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          background: alpha(VIOLET[400], 0.4),
          borderRadius: '3px',
        },
        '::selection': {
          background: alpha(PINK[400], 0.35),
          color: '#fff',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 28px',
          transition: 'all 0.25s ease',
        },
        contained: {
          background: `linear-gradient(135deg, ${PINK[400]} 0%, ${VIOLET[500]} 100%)`,
          boxShadow: `0 4px 24px ${alpha(PINK[500], 0.35)}`,
          '&:hover': {
            background: `linear-gradient(135deg, ${PINK[300]} 0%, ${VIOLET[400]} 100%)`,
            boxShadow: `0 6px 32px ${alpha(PINK[400], 0.5)}`,
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: alpha(PINK[400], 0.5),
          color: PINK[200],
          '&:hover': {
            borderColor: PINK[300],
            background: alpha(PINK[500], 0.08),
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: alpha('#1A0F2E', 0.8),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(VIOLET[400], 0.18)}`,
          borderRadius: 20,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 20px 48px ${alpha(VIOLET[600], 0.25)}`,
            borderColor: alpha(PINK[400], 0.4),
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
        },
        colorPrimary: {
          background: alpha(PINK[500], 0.15),
          color: PINK[200],
          border: `1px solid ${alpha(PINK[400], 0.3)}`,
        },
        colorSecondary: {
          background: alpha(VIOLET[500], 0.15),
          color: VIOLET[200],
          border: `1px solid ${alpha(VIOLET[400], 0.3)}`,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 8,
          background: alpha(VIOLET[900], 0.5),
        },
        bar: {
          borderRadius: 6,
          background: `linear-gradient(90deg, ${PINK[400]}, ${VIOLET[400]})`,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '0.95rem',
          color: alpha('#F5EEF8', 0.5),
          '&.Mui-selected': {
            color: PINK[300],
            fontWeight: 600,
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: `linear-gradient(90deg, ${PINK[400]}, ${VIOLET[400]})`,
          height: 3,
          borderRadius: 2,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(VIOLET[400], 0.15),
        },
      },
    },
  },
});

export { PINK, VIOLET };