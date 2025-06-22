// src/AppSPA.tsx

import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import { ViewType } from './views/ViewManager';
import { AppBarSPA } from './shared/components/organisms/AppBar/AppBarSPA';
import { NavigationDrawerSPA } from './shared/components/organisms/Drawer/NavigationDrawerSPA';

import { HomeView } from './views/HomeView/HomeView';
import { DashboardView } from './views/Dashboard/DashboardView';
import { HistoryView } from './views/History/HistoryView';
import { LoginView } from './views/Auth/LoginView';

import { useAuth } from '@/app/context/AuthContext';
import { Gender, Grade } from '@/domain/entities/Exercise';
import { User } from '@/domain/entities/User';

export const AppSPA: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as ViewType);
    setDrawerOpen(false);
  };

  const { user } = useAuth();

  // 🔒 Redirección automática al login si no está logueado
  useEffect(() => {
    if (!user && currentView !== 'login') {
      setCurrentView('login');
    }
  }, [user, currentView]);

  // Renderizador de vistas
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginView onLoginSuccess={() => setCurrentView('dashboard')} />;
      case 'home':
        return <HomeView onNavigate={setCurrentView} />;
      case 'dashboard':
        return <DashboardView />;
      case 'exercises':
        return (
          <Box>
            <h2>Vista de Ejercicios (próximamente)</h2>
          </Box>
        );
      case 'history':
        return <HistoryView />;
      case 'profile':
        return (
          <Box>
            <h2>Vista de Perfil (próximamente)</h2>
          </Box>
        );
      case 'settings':
        return (
          <Box>
            <h2>Vista de Configuraciones (próximamente)</h2>
          </Box>
        );
      case 'help':
        return (
          <Box>
            <h2>Vista de Ayuda (próximamente)</h2>
          </Box>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar principal */}
      <AppBarSPA
        onMenuClick={handleDrawerToggle}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Menú lateral */}
      <NavigationDrawerSPA
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#F6F4F4',
          minHeight: '100vh',
          pt: '112px',
          transition: 'margin 0.3s ease',
        }}
      >
        <Box sx={{ p: 3 }}>{renderView()}</Box>
      </Box>
    </Box>
  );
};
