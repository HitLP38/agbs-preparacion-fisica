import React from 'react';
import { Typography, Box } from '@mui/material';

export const SettingsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Configuraciones
      </Typography>
      <Typography variant="body1">Configuraciones de la aplicación</Typography>
    </Box>
  );
};
