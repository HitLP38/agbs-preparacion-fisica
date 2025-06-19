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

interface AppBarSPAProps {
  onMenuClick: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const CustomAppBarSPA: React.FC<AppBarSPAProps> = ({
  onMenuClick,
  currentView,
  onViewChange,
}) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Estados para menús
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

  // Navegación principal ACTUALIZADA con Home primero
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
      {/* Header principal con fondo E9EEED */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#E9EEED',
          borderBottom: '1px solid #D0D4D2',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Lado izquierdo - Logo + Nombre */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Menú hamburguesa (móvil) */}
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

            {/* Logo + Nombre */}
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

          {/* Lado derecho - Utilidades + Perfil */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Toggle tema */}
            <Tooltip
              title={
                isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
              }
            >
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

            {/* Perfil + Nombre */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#2E3E50',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                  }}
                >
                  Usuario
                </Typography>
              </Box>
              <Tooltip title="Perfil">
                <IconButton onClick={handleProfileMenuOpen}>
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
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Barra de navegación con fondo 2E3E50 */}
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
          {/* Navegación principal (desktop) */}
          {!isMobile && (
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
          )}

          {/* En móvil, mostrar solo la página actual */}
          {isMobile && (
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

      {/* Menú de perfil */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            handleNavigation('profile');
            handleProfileMenuClose();
          }}
        >
          <Person sx={{ mr: 1 }} />
          Mi Perfil
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleNavigation('history');
            handleProfileMenuClose();
          }}
        >
          <HistoryIcon sx={{ mr: 1 }} />
          Mi Progreso
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleNavigation('settings');
            handleProfileMenuClose();
          }}
        >
          <SettingsIcon sx={{ mr: 1 }} />
          Configuración
        </MenuItem>
      </Menu>

      {/* Menú de configuraciones */}
      <Menu
        anchorEl={settingsMenuAnchor}
        open={Boolean(settingsMenuAnchor)}
        onClose={handleSettingsMenuClose}
        onClick={handleSettingsMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={toggleTheme}>
          {isDarkMode ? (
            <LightMode sx={{ mr: 1 }} />
          ) : (
            <DarkMode sx={{ mr: 1 }} />
          )}
          {isDarkMode ? 'Tema Claro' : 'Tema Oscuro'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleNavigation('help');
            handleSettingsMenuClose();
          }}
        >
          <HelpIcon sx={{ mr: 1 }} />
          Centro de Ayuda
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleNavigation('settings');
            handleSettingsMenuClose();
          }}
        >
          <SettingsIcon sx={{ mr: 1 }} />
          Configuraciones Avanzadas
        </MenuItem>
      </Menu>
    </>
  );
};
