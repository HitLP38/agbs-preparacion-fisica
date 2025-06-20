// ============================================
// src/shared/components/organisms/Drawer/NavigationDrawer.tsx - ACTUALIZADO PARA SPA
// ============================================
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
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

// Importar el tipo desde donde corresponda
export type ViewType =
  | 'dashboard'
  | 'ejercicios'
  | 'historial'
  | 'perfil'
  | 'configuraciones'
  | 'ayuda';

interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  open,
  onClose,
  currentView,
  onViewChange,
}) => {
  const theme = useTheme();

  // Elementos de navegación principal
  const mainNavigationItems = [
    { label: 'Home', icon: <HomeIcon />, key: 'home' },
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      key: 'dashboard' as ViewType,
    },
    {
      label: 'Ejercicios',
      icon: <FitnessCenterIcon />,
      key: 'ejercicios' as ViewType,
    },
    { label: 'Historial', icon: <HistoryIcon />, key: 'historial' as ViewType },
  ];

  // Elementos de configuración
  const settingsItems = [
    { label: 'Mi Perfil', icon: <PersonIcon />, key: 'perfil' as ViewType },
    {
      label: 'Configuraciones',
      icon: <SettingsIcon />,
      key: 'configuraciones' as ViewType,
    },
    { label: 'Ayuda', icon: <HelpIcon />, key: 'ayuda' as ViewType },
  ];

  const handleItemClick = (view: ViewType) => {
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
      {/* Header del Drawer */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: `linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)`,
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={() => handleItemClick('home')}
      >
        {/* Logo */}
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

      {/* Perfil del usuario */}
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
            bgcolor: '#2E3E50',
            fontSize: '1rem',
          }}
        >
          U
        </Avatar>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Usuario
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Aspirante AGBS
          </Typography>
        </Box>
      </Box>

      {/* Lista de navegación */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {/* Navegación principal */}
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
                    backgroundColor: '#E9EEED',
                    color: '#2E3E50',
                    '& .MuiListItemIcon-root': {
                      color: '#2E3E50',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#E9EEED',
                    '& .MuiListItemIcon-root': {
                      color: '#2E3E50',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      currentView === item.key ? '#2E3E50' : 'text.secondary',
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

        {/* Configuraciones */}
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
                    backgroundColor: '#E9EEED',
                    '& .MuiListItemIcon-root': {
                      color: '#2E3E50',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#E9EEED',
                    '& .MuiListItemIcon-root': {
                      color: '#2E3E50',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer del Drawer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <ListItemButton
          onClick={() => {
            // Aquí puedes agregar lógica de logout
            console.log('Logout clicked');
            onClose();
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
