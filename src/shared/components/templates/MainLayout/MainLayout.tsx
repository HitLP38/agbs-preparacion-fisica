import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { CustomAppBar } from '@shared/components/organisms/AppBar';
import { NavigationDrawer } from '@shared/components/organisms/Drawer';

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
    navigate(`/app/${page}`);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <CustomAppBar
        onMenuClick={handleDrawerToggle}
        currentPage={currentPage}
      />

      {/* Drawer */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
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
