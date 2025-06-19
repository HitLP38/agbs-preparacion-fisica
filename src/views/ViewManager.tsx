import React, { useState } from 'react';
import { Box } from '@mui/material';

// Tipos de vistas disponibles
export type ViewType =
  | 'home'
  | 'dashboard'
  | 'exercises'
  | 'history'
  | 'profile'
  | 'settings'
  | 'help';

interface ViewManagerProps {
  children: (
    currentView: ViewType,
    setView: (view: ViewType) => void
  ) => React.ReactNode;
}

export const ViewManager: React.FC<ViewManagerProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  return <>{children(currentView, setCurrentView)}</>;
};

// Hook personalizado para usar el ViewManager
export const useView = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  return {
    currentView,
    setView: setCurrentView,
    isView: (view: ViewType) => currentView === view,
  };
};
