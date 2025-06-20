import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { EXERCISE_DEFINITIONS, ExerciseType } from '@/domain/entities/Exercise';
import { ExerciseCard } from '@components/molecules/ExerciseCard';

export const ExercisesView: React.FC = () => {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseType[]>(
    []
  );

  const allExercises = Object.values(EXERCISE_DEFINITIONS);

  const toggleExercise = (type: ExerciseType) => {
    setSelectedExercises((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Selecciona uno o más ejercicios
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        gap={2}
      >
        {allExercises.map((ex) => (
          <ExerciseCard
            key={ex.type}
            exercise={ex}
            selected={selectedExercises.includes(ex.type)}
            onClick={() => toggleExercise(ex.type)}
          />
        ))}
      </Box>

      {selectedExercises.length > 0 && (
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              console.log('Ejercicios a simular:', selectedExercises)
            }
          >
            Iniciar Simulación
          </Button>
        </Box>
      )}
    </Box>
  );
};
