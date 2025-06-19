import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { CustomAppBar } from '../../organisms/AppBar/AppBar';
import { NavigationDrawer } from '../../organisms/Drawer/NavigationDrawer';

export const MainLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extraer la página actual de la URL
  const currentPage = location.pathname.split('/').pop() || 'dashboard';

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlePageChange = (page: string) => {
    // La navegación ahora se maneja dentro del AppBar y Drawer
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar doble */}
      <CustomAppBar onMenuClick={handleDrawerToggle} />

      {/* Drawer */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPage="dashboard"
        onPageChange={handlePageChange}
      />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#F6F4F4', // Tu color de fondo
          minHeight: '100vh',
          pt: '112px', // Espacio para los dos AppBars (64px + 48px)
        }}
      >
        {' '}
        {/* Espaciador para el AppBar fijo */}
        <Toolbar />
        {/* Contenido de la página */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
