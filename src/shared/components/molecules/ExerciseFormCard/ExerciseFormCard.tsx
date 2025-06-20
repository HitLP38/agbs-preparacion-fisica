import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Exercise } from '@/domain/entities/Exercise';

interface Props {
  exercise: Exercise;
  onSubmit: (value: string) => void;
}

export const ExerciseFormCard: React.FC<Props> = ({ exercise, onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim() === '') return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={1}>
          {exercise.description}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Ingresa tu marca en {exercise.unit}.
        </Typography>

        <TextField
          fullWidth
          label={`Marca (${exercise.unit})`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            exercise.unit === 'minutos:segundos' ? 'Ej: 03:45' : undefined
          }
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Continuar
        </Button>
      </CardContent>
    </Card>
  );
};
