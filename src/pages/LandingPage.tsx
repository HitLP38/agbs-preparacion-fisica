import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
  History as HistoryIcon,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { OptimizedImage } from '../shared/components/atoms/OptimizedImage/OptimizedImage';

export const LandingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      title: 'Dashboard',
      description: 'Visualiza tu progreso y estadísticas',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&q=80',
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      title: 'Ejercicios',
      description: 'Simula las pruebas físicas oficiales',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&q=80',
    },
    {
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      title: 'Historial',
      description: 'Revisa tus simulaciones anteriores',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&q=80',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            py: 4,
          }}
        >
          {/* Contenido principal */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              Evalúa tu progreso con el RetoAGBS
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Pon a prueba tus habilidades en los 6 ejercicios oficiales de la
              academia. Descubre tu puntuación, sigue tu avance y supera tus
              propios límites.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/app')}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              ¡Comienza tu evaluación ahora!
            </Button>
          </Box>

          {/* Imagen Hero */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <OptimizedImage
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&q=80"
              alt="Entrenamiento físico AGBS"
              width="100%"
              height={400}
              borderRadius={4}
              objectFit="cover"
            />
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 600, color: 'primary.main' }}
          >
            Funcionalidades
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center',
            }}
          >
            {features.map((feature, index) => (
              <Box key={index} sx={{ flex: 1, maxWidth: 350 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  {/* Imagen de la feature */}
                  <OptimizedImage
                    src={feature.image}
                    alt={feature.title}
                    height={200}
                    objectFit="cover"
                  />

                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
