// ============================================
// src/App.tsx - NUEVA ESTRUCTURA SPA
// ============================================
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { CustomAppBar } from '@shared/components/organisms/AppBar/AppBar';
import { NavigationDrawer } from '@shared/components/organisms/Drawer/NavigationDrawer';
import { DashboardPage } from '@pages/DashboardPage';
import { ExercisesPage } from '@pages/ExercisesPage';
import { HistoryPage } from '@pages/HistoryPage';
import { ProfilePage } from '@pages/ProfilePage';
import { SettingsPage } from '@pages/SettingsPage';
import { HelpPage } from '@pages/HelpPage';

// Tipos de vistas disponibles
export type ViewType =
  | 'dashboard'
  | 'ejercicios'
  | 'historial'
  | 'perfil'
  | 'configuraciones'
  | 'ayuda';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setDrawerOpen(false); // Cerrar drawer en móvil
  };

  // Función para renderizar la vista actual
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'ejercicios':
        return <ExercisesPage />;
      case 'historial':
        return <HistoryPage />;
      case 'perfil':
        return <ProfilePage />;
      case 'configuraciones':
        return <SettingsPage />;
      case 'ayuda':
        return <HelpPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header fijo que SIEMPRE se ve */}
      <CustomAppBar
        onMenuClick={handleDrawerToggle}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Drawer para móvil */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Contenido principal que cambia dinámicamente */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#F6F4F4', // Tu color de fondo
          minHeight: '100vh',
          pt: '112px', // Espacio para header doble
        }}
      >
        <Box sx={{ p: 3 }}>{renderCurrentView()}</Box>
      </Box>
    </Box>
  );
}

export default App;
