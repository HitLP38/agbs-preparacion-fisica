import React from 'react';
import { Typography, Box } from '@mui/material';

export const HistoryPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Historial
      </Typography>
      <Typography variant="body1">
        Aquí irá el historial de simulaciones
      </Typography>
    </Box>
  );
};
