import React from 'react';
import { Typography, Box } from '@mui/material';

export const HelpPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Centro de Ayuda
      </Typography>
      <Typography variant="body1">
        Documentación y ayuda para usar la aplicación
      </Typography>
    </Box>
  );
};
