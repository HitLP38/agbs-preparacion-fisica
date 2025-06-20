// src/shared/components/molecules/ExerciseCard/ExerciseCard.tsx

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Exercise } from '@/domain/entities/Exercise';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

interface ExerciseCardProps {
  exercise: Exercise;
  selected?: boolean;
  onClick?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  selected = false,
  onClick,
}) => {
  return (
    <Card
      sx={{
        border: selected ? '2px solid' : '1px solid',
        borderColor: selected ? 'primary.main' : 'grey.300',
        borderRadius: 2,
        boxShadow: selected ? 4 : 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <FitnessCenterIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              {exercise.description}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Unidad: {exercise.unit}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
