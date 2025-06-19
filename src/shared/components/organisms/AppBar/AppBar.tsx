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
  Dashboard as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  LightMode,
  DarkMode,
  Person,
} from '@mui/icons-material';
import { useCustomTheme } from '@shared/theme/ThemeProvider';

interface AppBarProps {
  onMenuClick: () => void;
  currentPage: string;
}

export const CustomAppBar: React.FC<AppBarProps> = ({
  onMenuClick,
  currentPage,
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

  // Navegación principal (para desktop)
  const navigationItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
    { label: 'Ejercicios', icon: <FitnessCenterIcon />, key: 'ejercicios' },
    { label: 'Historial', icon: <HistoryIcon />, key: 'historial' },
  ];

  return (
    <>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Lado izquierdo - Logo + Navegación */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Menú hamburguesa (móvil) */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onMenuClick}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  background:
                    'linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                }}
              >
                🎖️
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                RetoAGBS
              </Typography>
            </Box>

            {/* Navegación principal (desktop) */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, ml: 3 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.key}
                    startIcon={item.icon}
                    sx={{
                      color:
                        currentPage === item.key
                          ? 'primary.main'
                          : 'text.secondary',
                      fontWeight: currentPage === item.key ? 600 : 400,
                      backgroundColor:
                        currentPage === item.key
                          ? 'primary.light'
                          : 'transparent',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                      },
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          {/* Lado derecho - Utilidades */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Toggle tema */}
            <Tooltip
              title={
                isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
              }
            >
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {/* Ayuda */}
            <Tooltip title="Ayuda">
              <IconButton color="inherit">
                <HelpIcon />
              </IconButton>
            </Tooltip>

            {/* Configuraciones */}
            <Tooltip title="Configuraciones">
              <IconButton color="inherit" onClick={handleSettingsMenuOpen}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            {/* Perfil */}
            <Tooltip title="Perfil">
              <IconButton onClick={handleProfileMenuOpen}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.9rem',
                  }}
                >
                  U
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
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
        <MenuItem>
          <Person sx={{ mr: 1 }} />
          Mi Perfil
        </MenuItem>
        <MenuItem>
          <HistoryIcon sx={{ mr: 1 }} />
          Mi Progreso
        </MenuItem>
        <MenuItem>
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
        <MenuItem>
          <HelpIcon sx={{ mr: 1 }} />
          Centro de Ayuda
        </MenuItem>
        <MenuItem>
          <SettingsIcon sx={{ mr: 1 }} />
          Configuraciones Avanzadas
        </MenuItem>
      </Menu>
    </>
  );
};
