import { createTheme, ThemeOptions } from '@mui/material/styles';

// Tu paleta de colores personalizada
const colorPalette = {
  primary: '#2E3E50', // Azul oscuro profesional
  secondary: '#E9EEED', // Gris claro suave
  background: '#F6F4F4', // Fondo principal
  white: '#FFFFFF', // Blanco puro
  dark: '#1A252F', // Más oscuro para contrastes
  light: '#F0F2F1', // Más claro para superficies
};

// Configuración base del tema
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: colorPalette.primary,
      light: '#4A5D75',
      dark: '#1E2B3A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colorPalette.secondary,
      light: '#F1F3F2',
      dark: '#D0D4D2',
      contrastText: colorPalette.primary,
    },
    background: {
      default: colorPalette.background,
      paper: colorPalette.white,
    },
    text: {
      primary: colorPalette.primary,
      secondary: '#5A6A7A',
      disabled: '#9CA3AB',
    },
    divider: '#E1E5E4',
    // Colores semánticos personalizados
    success: {
      main: '#16a34a',
      light: '#dcfce7',
      dark: '#14532d',
    },
    error: {
      main: '#dc2626',
      light: '#fee2e2',
      dark: '#991b1b',
    },
    warning: {
      main: '#d97706',
      light: '#fef3c7',
      dark: '#92400e',
    },
    info: {
      main: '#0891b2',
      light: '#e0f2fe',
      dark: '#164e63',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: colorPalette.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: colorPalette.primary,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // No uppercase en botones
      fontWeight: 500,
    },
  },
  spacing: 8, // 8px como unidad base
  shape: {
    borderRadius: 8, // Border radius por defecto
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    // Customización de componentes MUI
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(46, 62, 80, 0.2)',
          },
        },
        containedPrimary: {
          backgroundColor: colorPalette.primary,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#1E2B3A',
          },
        },
        containedSecondary: {
          backgroundColor: colorPalette.secondary,
          color: colorPalette.primary,
          '&:hover': {
            backgroundColor: '#D0D4D2',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(46, 62, 80, 0.1)',
          border: `1px solid #E1E5E4`,
          '&:hover': {
            boxShadow: '0 4px 16px rgba(46, 62, 80, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colorPalette.primary,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colorPalette.white,
          color: colorPalette.primary,
          boxShadow: '0 1px 4px rgba(46, 62, 80, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colorPalette.white,
          borderRight: `1px solid #E1E5E4`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        filled: {
          backgroundColor: colorPalette.secondary,
          color: colorPalette.primary,
          '&.MuiChip-colorPrimary': {
            backgroundColor: colorPalette.primary,
            color: '#FFFFFF',
          },
        },
      },
    },
  },
};

// Crear tema principal
export const muiTheme = createTheme(themeOptions);

// Tema oscuro (para futuro toggle)
export const darkTheme = createTheme({
  ...themeOptions,
  palette: {
    ...themeOptions.palette,
    mode: 'dark',
    primary: {
      main: '#4A5D75',
      light: '#6B7A8F',
      dark: '#2E3E50',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#1A252F',
      paper: '#2E3E50',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
      disabled: '#78909C',
    },
  },
});

// Utilidades para usar colores en componentes custom
export const customColors = {
  primary: colorPalette.primary,
  secondary: colorPalette.secondary,
  background: colorPalette.background,
  white: colorPalette.white,
  dark: colorPalette.dark,
  light: colorPalette.light,
  // Funciones helper
  rgba: (color: string, alpha: number) =>
    `${color}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')}`,
};
