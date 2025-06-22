import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Person as PersonIcon,
  FitnessCenter as FitnessCenterIcon,
  School as SchoolIcon,
  ArrowForward,
} from '@mui/icons-material';
import { ViewType } from '../ViewManager';

export interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Pasos del proceso
  const processSteps = [
    {
      icon: <PersonIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Seleccione sexo',
      description: 'Elige tu género para aplicar el baremo correcto',
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Seleccione Ejercicio',
      description: 'Escoge los ejercicios que quieres evaluar',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Seleccione grado',
      description: 'Indica tu grado académico para el cálculo',
    },
  ];

  const handleStartEvaluation = () => {
    onNavigate('exercises');
  };

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '70vh',
            gap: { xs: 4, md: 8 },
            flexDirection: { xs: 'column', md: 'row' },
            py: { xs: 4, md: 0 },
          }}
        >
          {/* Contenido Principal */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              Evalúa tu progreso con el{' '}
              <Box
                component="span"
                sx={{
                  background:
                    'linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                RetoAGBS
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 4,
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.25rem' },
                maxWidth: '600px',
                mx: { xs: 'auto', md: 0 },
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
              onClick={handleStartEvaluation}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #1E2B3A 0%, #2E3E50 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                },
                transition: 'all 0.3s ease',
              }}
            >
              ¡Comienza tu evaluación ahora!
            </Button>
          </Box>

          {/* Imagen Hero */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              maxWidth: { xs: '100%', md: '500px' },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: { xs: '300px', md: '400px' },
                borderRadius: 4,
                background: `linear-gradient(135deg, rgba(46, 62, 80, 0.1) 0%, rgba(74, 93, 117, 0.05) 100%), 
                           url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: theme.shadows[12],
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    'linear-gradient(45deg, rgba(46, 62, 80, 0.1), transparent)',
                },
              }}
            />
          </Box>
        </Box>

        {/* Proceso de Evaluación */}
        <Box sx={{ py: { xs: 4, md: 8 } }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              mb: 2,
            }}
          >
            Proceso de Evaluación
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
          >
            Sigue estos simples pasos para comenzar tu evaluación física oficial
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: '900px',
              mx: 'auto',
            }}
          >
            {processSteps.map((step, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[12],
                    borderColor: 'primary.light',
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Número del paso */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background:
                        'linear-gradient(135deg, #2E3E50 0%, #4A5D75 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      mb: 2,
                    }}
                  >
                    {index + 1}
                  </Box>

                  {/* Icono */}
                  <Box sx={{ mb: 2 }}>{step.icon}</Box>

                  {/* Título */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>

                  {/* Descripción */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* CTA Final */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleStartEvaluation}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              ¡Comenzar!
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
