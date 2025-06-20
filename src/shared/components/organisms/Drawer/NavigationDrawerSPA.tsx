// src/shared/components/organisms/Drawer/NavigationDrawerSPA.tsx

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  useTheme,
} from '@mui/material';

import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

import { useAuth } from '@/app/context/AuthContext';

interface NavigationDrawerSPAProps {
  open: boolean;
  onClose: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const NavigationDrawerSPA: React.FC<NavigationDrawerSPAProps> = ({
  open,
  onClose,
  currentView,
  onViewChange,
}) => {
  const theme = useTheme();
  const { user, logout } = useAuth(); // 👈 Acceder al usuario logueado

  // Opciones principales de navegación
  const mainNavigationItems = [
    { label: 'Home', icon: <HomeIcon />, key: 'home' },
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
    { label: 'Ejercicios', icon: <FitnessCenterIcon />, key: 'exercises' },
    { label: 'Historial', icon: <HistoryIcon />, key: 'history' },
  ];

  // Opciones secundarias
  const settingsItems = [
    { label: 'Mi Perfil', icon: <PersonIcon />, key: 'profile' },
    { label: 'Configuraciones', icon: <SettingsIcon />, key: 'settings' },
    { label: 'Ayuda', icon: <HelpIcon />, key: 'help' },
  ];

  // Navegar y cerrar el Drawer
  const handleItemClick = (view: string) => {
    onViewChange(view);
    onClose();
  };

  const drawerWidth = 280;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Encabezado con logo */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          color: 'white',
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            mb: 1,
          }}
        >
          🎖️
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          RetoAGBS
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'center' }}>
          Academia General Básica de Suboficiales
        </Typography>
      </Box>

      {/* Perfil del usuario logueado */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            fontSize: '1rem',
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {user?.name || 'Usuario'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.grade || 'Sin grado'}
          </Typography>
        </Box>
      </Box>

      {/* Navegación principal */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ pt: 1 }}>
          {mainNavigationItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={currentView === item.key}
                onClick={() => handleItemClick(item.key)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      currentView === item.key
                        ? 'primary.main'
                        : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: currentView === item.key ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2, my: 1 }} />

        {/* Opciones secundarias */}
        <List>
          {settingsItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={currentView === item.key}
                onClick={() => handleItemClick(item.key)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'secondary.light',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'secondary.light',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Botón Cerrar Sesión */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <ListItemButton
          onClick={() => {
            logout(); // ✅ limpia el contexto
            onViewChange('login'); // ✅ redirige a login
          }}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.light',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', textAlign: 'center', mt: 1 }}
        >
          v1.0.0 - 2025
        </Typography>
      </Box>
    </Drawer>
  );
};
