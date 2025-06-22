import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useCustomTheme } from '../../../theme/ThemeProvider';

// Clerk Auth
import {
  useUser,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from '@clerk/clerk-react';

interface AppBarSPAProps {
  onMenuClick: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const AppBarSPA: React.FC<AppBarSPAProps> = ({
  onMenuClick,
  currentView,
  onViewChange,
}) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user: clerkUser } = useUser();

  // Menús de perfil y configuración
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [settingsMenuAnchor, setSettingsMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleSettingsMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setSettingsMenuAnchor(e.currentTarget);
  const handleSettingsMenuClose = () => setSettingsMenuAnchor(null);

  // Vistas disponibles
  const navigationItems = [
    { label: 'Home', icon: <HomeIcon />, key: 'home' },
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
    { label: 'Ejercicios', icon: <FitnessCenterIcon />, key: 'exercises' },
    { label: 'Historial', icon: <HistoryIcon />, key: 'history' },
  ];

  return (
    <>
      {/* 🟦 Barra superior */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#E9EEED',
          borderBottom: '1px solid #D0D4D2',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo + Título */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton
                edge="start"
                onClick={onMenuClick}
                sx={{ color: '#2E3E50' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
              }}
              onClick={() => onViewChange('home')}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  background:
                    'linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)',
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.3rem',
                }}
              >
                🎖️
              </Box>
              <Typography
                variant="h6"
                fontWeight={700}
                color="#2E3E50"
                fontSize="1.2rem"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                RetoAGBS
              </Typography>
            </Box>
          </Box>

          {/* 🟨 Utilidades lado derecho */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Toggle de tema */}
            <Tooltip title={isDarkMode ? 'Tema claro' : 'Tema oscuro'}>
              <IconButton onClick={toggleTheme} sx={{ color: '#2E3E50' }}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {/* Ayuda */}
            <Tooltip title="Ayuda">
              <IconButton
                onClick={() => onViewChange('help')}
                sx={{ color: '#2E3E50' }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>

            {/* Configuración */}
            <Tooltip title="Configuraciones">
              <IconButton
                onClick={handleSettingsMenuOpen}
                sx={{ color: '#2E3E50' }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            {/* Usuario: Mostrar nombre o correo */}
            {clerkUser && (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#2E3E50', fontWeight: 500, fontSize: '0.9rem' }}
                >
                  {clerkUser.fullName ||
                    clerkUser.primaryEmailAddress?.emailAddress ||
                    'Usuario'}
                </Typography>
              </Box>
            )}

            {/* Usuario: Sesión */}
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              {/* The SignInButton will pass its onClick to the child IconButton.
                  Adding fallbackRedirectUrl for robustness.
                  Wrapping with Tooltip for better UX.
                  Using component="span" on IconButton as it can sometimes help with complex nesting. */}
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <Tooltip title="Iniciar Sesión">
                  <IconButton component="span" aria-label="sign in button">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: '#2E3E50',
                        fontSize: '0.9rem',
                      }}
                    >
                      U
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </SignInButton>
            </SignedOut>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🟫 Barra inferior de navegación */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          top: 64,
          backgroundColor: '#2E3E50',
          zIndex: theme.zIndex.appBar - 1,
        }}
      >
        <Toolbar sx={{ minHeight: '48px !important', px: 3 }}>
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.key}
                  startIcon={item.icon}
                  onClick={() => onViewChange(item.key)}
                  sx={{
                    color:
                      currentView === item.key
                        ? '#FFFFFF'
                        : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: currentView === item.key ? 600 : 400,
                    backgroundColor:
                      currentView === item.key
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                    },
                    borderRadius: 1.5,
                    px: 2,
                    py: 0.5,
                    fontSize: '0.9rem',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {navigationItems.find((i) => i.key === currentView)?.label ||
                'Home'}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
