import React from 'react';
import { Typography, Box } from '@mui/material';

export const ProfilePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Mi Perfil
      </Typography>
      <Typography variant="body1">
        Configuración del perfil de usuario
      </Typography>
    </Box>
  );
};
