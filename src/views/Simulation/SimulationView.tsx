// ==========================================================
// src/views/Simulation/SimulationView.tsx
// Paso 2: Ingreso de marcas por ejercicio seleccionado
// ==========================================================

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  ExerciseType,
  EXERCISE_DEFINITIONS,
  Gender,
  Grade,
} from '@/domain/entities/Exercise';

interface Props {
  selectedExercises: ExerciseType[];
  rawInput: Partial<Record<ExerciseType, string>>; // Corregido
  setRawInput: (input: Partial<Record<ExerciseType, string>>) => void; // Corregido
  onNext: () => void;
}

export const SimulationView: React.FC<Props> = ({
  selectedExercises,
  rawInput,
  setRawInput,
  onNext,
}) => {
  // Cambiar valor de marca de un ejercicio
  const handleChange = (type: ExerciseType, value: string) => {
    setRawInput({
      ...rawInput,
      [type]: value,
    });
  };

  const handleContinue = () => {
    // Validar que todas las marcas estén completas
    const incompletos = selectedExercises.some((type) => !rawInput[type]);
    if (incompletos) {
      alert('Completa todos los campos antes de continuar.');
      return;
    }

    onNext(); // Pasar al siguiente paso (mostrar resultados)
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Ingresa tus marcas
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={2}
        mb={4}
      >
        {selectedExercises.map((type) => {
          const def = EXERCISE_DEFINITIONS[type];

          return (
            <Card key={type} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  {def.description}
                </Typography>

                <TextField
                  fullWidth
                  label={`Marca (${def.unit})`}
                  value={rawInput[type] || ''}
                  onChange={(e) => handleChange(type, e.target.value)}
                />
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleContinue}
        >
          Ver Resultados
        </Button>
      </Box>
    </Box>
  );
};
