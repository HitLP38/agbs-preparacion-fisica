import React from 'react';
import Grid from '@mui/material/Grid'; // ✅ Corrección clave aquí
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  IconButton,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  FitnessCenter,
  EmojiEvents,
  ArrowForward,
} from '@mui/icons-material';
import { ViewType } from '../ViewManager';

interface DashboardViewProps {
  onNavigate: (view: ViewType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const stats = {
    totalSimulations: 12,
    averageScore: 8.5,
    aptoPercentage: 85,
    lastSimulation: '2 días atrás',
    bestExercise: 'Salto Vertical',
    improvement: '+15%',
  };

  const recentSimulations = [
    { id: 1, date: '19/11/2024', score: 8.7, status: 'APTO' },
    { id: 2, date: '15/11/2024', score: 8.2, status: 'APTO' },
    { id: 3, date: '10/11/2024', score: 7.9, status: 'APTO' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}
        >
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido de vuelta. Aquí está tu progreso actual.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <EmojiEvents sx={{ color: 'primary.main' }} />
                <Chip
                  label={stats.improvement}
                  size="small"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {stats.totalSimulations}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Simulaciones Totales
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <TrendingUp sx={{ color: 'success.main' }} />
                <Typography variant="caption" color="text.secondary">
                  Promedio
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}
              >
                {stats.averageScore}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nota Promedio
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: 'info.main', mb: 1 }}
                >
                  {stats.aptoPercentage}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ejercicios APTO
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={stats.aptoPercentage}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              },
            }}
            onClick={() => onNavigate('exercises')}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <FitnessCenter sx={{ color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Nueva Simulación
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comienza ahora
                  </Typography>
                </Box>
                <IconButton color="primary">
                  <ArrowForward />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Simulaciones Recientes
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
              onClick={() => onNavigate('history')}
            >
              Ver todas →
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentSimulations.map((sim) => (
              <Box
                key={sim.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {sim.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nota: {sim.score}
                  </Typography>
                </Box>
                <Chip label={sim.status} color="success" size="small" />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
