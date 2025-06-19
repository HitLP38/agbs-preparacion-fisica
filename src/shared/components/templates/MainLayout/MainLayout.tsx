// src/shared/components/templates/MainLayout/MainLayout.tsx - CORREGIDO
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; // ← AGREGAR IMPORTS
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
    navigate(`/app/${page}`); // ← CORREGIR: navegar a la página
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
        currentPage={currentPage} // ← CORREGIR: usar la variable real
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
        {/* Contenido de la página */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
