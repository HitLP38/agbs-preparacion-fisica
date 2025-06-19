import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@shared/components/templates/MainLayout';
import { LandingPage } from '@pages/LandingPage';
import { DashboardPage } from '@pages/DashboardPage';
import { ExercisesPage } from '@pages/ExercisesPage';
import { HistoryPage } from '@pages/HistoryPage';
import { ProfilePage } from '@pages/ProfilePage';
import { SettingsPage } from '@pages/SettingsPage';
import { HelpPage } from '@pages/HelpPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page (página principal sin layout) */}
        <Route path="/" element={<LandingPage />} />

        {/* Rutas con layout principal */}
        <Route path="/app" element={<MainLayout />}>
          {/* Redirección por defecto al dashboard */}
          <Route index element={<Navigate to="/app/dashboard" replace />} />

          {/* Páginas principales */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="ejercicios" element={<ExercisesPage />} />
          <Route path="historial" element={<HistoryPage />} />

          {/* Páginas de configuración */}
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="configuraciones" element={<SettingsPage />} />
          <Route path="ayuda" element={<HelpPage />} />
        </Route>

        {/* Ruta de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
