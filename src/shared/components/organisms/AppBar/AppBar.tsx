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
import { useCustomTheme } from '../../../theme/ThemeProvider';
import { useNavigate, useLocation } from 'react-router-dom';

interface AppBarProps {
  onMenuClick: () => void;
}

export const CustomAppBar: React.FC<AppBarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para menús
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [settingsMenuAnchor, setSettingsMenuAnchor] =
    useState<null | HTMLElement>(null);

  // Extraer página actual
  const currentPage = location.pathname.split('/').pop() || 'dashboard';

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

  const handleNavigation = (page: string) => {
    navigate(`/app/${page}`);
  };

  return (
    <>
      {/* Header principal con fondo E9EEED */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#E9EEED', // Tu color secundario
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  color: '#2E3E50', // Tu color primario
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
              <IconButton sx={{ color: '#2E3E50' }}>
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
                  Nombre
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
                    N
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
          top: 64, // Debajo del header principal
          backgroundColor: '#2E3E50', // Tu color primario
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
                      currentPage === item.key
                        ? '#FFFFFF'
                        : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: currentPage === item.key ? 600 : 400,
                    backgroundColor:
                      currentPage === item.key
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
              {navigationItems.find((item) => item.key === currentPage)
                ?.label || 'Dashboard'}
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
        <MenuItem onClick={() => navigate('/app/perfil')}>
          <Person sx={{ mr: 1 }} />
          Mi Perfil
        </MenuItem>
        <MenuItem onClick={() => navigate('/app/historial')}>
          <HistoryIcon sx={{ mr: 1 }} />
          Mi Progreso
        </MenuItem>
        <MenuItem onClick={() => navigate('/app/configuraciones')}>
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
        <MenuItem onClick={() => navigate('/app/ayuda')}>
          <HelpIcon sx={{ mr: 1 }} />
          Centro de Ayuda
        </MenuItem>
        <MenuItem onClick={() => navigate('/app/configuraciones')}>
          <SettingsIcon sx={{ mr: 1 }} />
          Configuraciones Avanzadas
        </MenuItem>
      </Menu>
    </>
  );
};
