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
  Person,
} from '@mui/icons-material';
import { useCustomTheme } from '../../../theme/ThemeProvider';

// Clerk
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react';

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

  // Clerk: Obtener usuario logueado sin conflicto
  const { user: clerkUser } = useUser();

  // Menús desplegables
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [settingsMenuAnchor, setSettingsMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchor(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsMenuAnchor(null);
  };

  // Ítems principales del AppBar
  const navigationItems = [
    { label: 'Home', icon: <HomeIcon />, key: 'home' },
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
    { label: 'Ejercicios', icon: <FitnessCenterIcon />, key: 'exercises' },
    { label: 'Historial', icon: <HistoryIcon />, key: 'history' },
  ];

  const handleNavigation = (view: string) => {
    onViewChange(view);
  };

  return (
    <>
      {/* AppBar Superior */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#E9EEED',
          borderBottom: '1px solid #D0D4D2',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo + Nombre */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton
                edge="start"
                sx={{ color: '#2E3E50' }}
                aria-label="menu"
                onClick={onMenuClick}
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
              onClick={() => handleNavigation('home')}
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
                component="div"
                sx={{
                  fontWeight: 700,
                  color: '#2E3E50',
                  fontSize: '1.2rem',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                RetoAGBS
              </Typography>
            </Box>
          </Box>

          {/* Lado derecho: Botones + Usuario */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Tema claro/oscuro */}
            <Tooltip title={isDarkMode ? 'Tema claro' : 'Tema oscuro'}>
              <IconButton onClick={toggleTheme} sx={{ color: '#2E3E50' }}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {/* Ayuda */}
            <Tooltip title="Ayuda">
              <IconButton
                sx={{ color: '#2E3E50' }}
                onClick={() => handleNavigation('help')}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>

            {/* Configuraciones */}
            <Tooltip title="Configuraciones">
              <IconButton
                sx={{ color: '#2E3E50' }}
                onClick={handleSettingsMenuOpen}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            {/* Nombre del usuario logueado o por defecto */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#2E3E50',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                }}
              >
                {clerkUser?.fullName ||
                  clerkUser?.primaryEmailAddress?.emailAddress ||
                  'Usuario'}
              </Typography>
            </Box>

            {/* Avatar o botón de login */}
            {clerkUser ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <IconButton>
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
              </SignInButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Barra de navegación secundaria */}
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
                  onClick={() => handleNavigation(item.key)}
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
              {navigationItems.find((item) => item.key === currentView)
                ?.label || 'Home'}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
