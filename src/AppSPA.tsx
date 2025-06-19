import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ViewType } from './views/ViewManager';
import { CustomAppBarSPA } from './shared/components/organisms/AppBar/AppBarSPA';
import { NavigationDrawerSPA } from './shared/components/organisms/Drawer/NavigationDrawerSPA';
import { DashboardView } from './views/Dashboard/DashboardView';
// import { ExercisesView } from './views/Exercises/ExercisesView';
// import { HistoryView } from './views/History/HistoryView';
// import { ProfileView } from './views/Profile/ProfileView';
// import { SettingsView } from './views/Settings/SettingsView';
// import { HelpView } from './views/Help/HelpView';

export const AppSPA: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
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

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNavigate={setCurrentView} />;
      case 'exercises':
        return (
          <Box>
            <h2>Vista de Ejercicios (próximamente)</h2>
          </Box>
        );
      case 'history':
        return (
          <Box>
            <h2>Vista de Historial (próximamente)</h2>
          </Box>
        );
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
        return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CustomAppBarSPA
        onMenuClick={handleDrawerToggle}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <NavigationDrawerSPA
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

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
