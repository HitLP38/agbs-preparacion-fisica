// ==================================================================
// src/views/Simulation/SimulationResultsView.tsx
// Paso 3: Mostrar resultados de la simulación + guardar si hay login
// ==================================================================

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from '@mui/material';

import {
  ExerciseType,
  EXERCISE_DEFINITIONS,
  Gender,
  Grade,
} from '@/domain/entities/Exercise';
import {
  SimulationRecord,
  ExerciseResult,
} from '@/domain/entities/SimulationRecord';
import { LocalSimulationRepository } from '@/infrastructure/repositories/SimulationRepository';
import { useUser, SignInButton } from '@clerk/clerk-react';

interface Props {
  results: Partial<Record<ExerciseType, { puntos: number; nota: number }>>; //  Cambiado
  rawInput: Partial<Record<ExerciseType, string>>; //  Cambiado
  selectedExercises: ExerciseType[];
  gender: Gender;
  grade: Grade;
  onRestart: () => void;
}

// Componente principal
export const SimulationResultsView: React.FC<Props> = ({
  results,
  rawInput,
  selectedExercises,
  gender,
  grade,
  onRestart,
}) => {
  const { user } = useUser(); // Info de sesión Clerk
  const simulationRepo = new LocalSimulationRepository();

  // Convertir a array para renderizar tarjetas
  const entries = Object.entries(results) as [
    ExerciseType,
    { puntos: number; nota: number },
  ][];

  const promedioNota =
    entries.reduce((acc, [, val]) => acc + val.nota, 0) / entries.length;

  // Manejar el guardado si hay login
  const handleSave = async () => {
    if (!user) return;

    const now = new Date().toISOString();

    const resultList: ExerciseResult[] = selectedExercises
      .map((type) => {
        const marca = rawInput[type];
        const result = results[type];

        if (!marca || !result) return null;

        return {
          type,
          marca,
          puntos: result.puntos,
          nota: result.nota,
        };
      })
      .filter((r): r is ExerciseResult => r !== null);

    if (resultList.length !== selectedExercises.length) {
      alert('Completa todos los campos antes de guardar los resultados.');
      return;
    }

    const promedio =
      resultList.reduce((acc, r) => acc + r.nota, 0) / resultList.length;

    const record: SimulationRecord = {
      id: crypto.randomUUID(),
      userId: user.id,
      gender,
      grade,
      date: now,
      results: resultList,
      finalScore: promedio,
    };

    try {
      await simulationRepo.save(record);
      alert('Simulación guardada exitosamente.');
      onRestart();
    } catch (error) {
      console.error('Error al guardar simulación:', error);
      alert('Ocurrió un error al guardar.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Resultados de la Simulación
      </Typography>

      {/* Tarjetas individuales por ejercicio */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={2}
        mb={4}
      >
        {entries.map(([type, { puntos, nota }]) => (
          <Card key={type} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                {EXERCISE_DEFINITIONS[type].description}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Puntos: {puntos}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nota: {nota.toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Nota Final */}
      <Card sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Nota Final
          </Typography>
          <Typography variant="h3" color="primary" fontWeight={700}>
            {promedioNota.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      {/* Botones finales */}
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="outlined" onClick={onRestart}>
          Nueva Simulación
        </Button>

        {user ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar Resultados
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button variant="contained" color="primary">
              Iniciar sesión para guardar
            </Button>
          </SignInButton>
        )}
      </Box>
    </Box>
  );
};
