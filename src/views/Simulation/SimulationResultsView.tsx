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
import { useCustomTheme } from '@/shared/theme/ThemeProvider';

// Clerk
import { useUser, UserButton, useClerk } from '@clerk/clerk-react';

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
  const { openSignIn } = useClerk();

  // Estado para menús desplegables
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
      {/* AppBar superior */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#E9EEED',
          borderBottom: '1px solid #D0D4D2',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo y navegación izquierda */}
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

          {/* Iconos y perfil derecho */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={isDarkMode ? 'Tema claro' : 'Tema oscuro'}>
              <IconButton onClick={toggleTheme} sx={{ color: '#2E3E50' }}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Ayuda">
              <IconButton
                sx={{ color: '#2E3E50' }}
                onClick={() => handleNavigation('help')}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Configuraciones">
              <IconButton
                sx={{ color: '#2E3E50' }}
                onClick={handleSettingsMenuOpen}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            {/* Nombre de usuario */}
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

            {/* Avatar / botón login */}
            {clerkUser ? (
              <UserButton />
            ) : (
              <IconButton onClick={() => openSignIn()}>
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
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* AppBar inferior de navegación */}
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
