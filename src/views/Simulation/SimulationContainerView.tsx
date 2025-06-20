// ===================================================================
// src/views/Simulation/SimulationContainerView.tsx
// Controlador principal SPA del flujo completo de simulación
// ===================================================================

import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';

import { ExerciseType, Gender, Grade } from '@/domain/entities/Exercise';
import { CalculateSimulation } from '@/domain/usecases/CalculateSimulation';

import { SimulationInputView } from './SimulationInputView';
import { SimulationView } from './SimulationView';
import { SimulationResultsView } from './SimulationResultsView';

// Posibles pasos del flujo
type Step = 'input' | 'form' | 'results';

export const SimulationContainerView: React.FC = () => {
  // Paso actual
  const [step, setStep] = useState<Step>('input');

  // Estado compartido entre pasos
  const [selectedExercises, setSelectedExercises] = useState<ExerciseType[]>(
    []
  );
  const [rawInput, setRawInput] = useState<
    Partial<Record<ExerciseType, string>>
  >({});
  const [results, setResults] = useState<
    Partial<Record<ExerciseType, { puntos: number; nota: number }>>
  >({});

  // Datos personales
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [grade, setGrade] = useState<Grade>(Grade.FIRST);

  // Iniciar flujo después de paso 1
  const handleStart = (
    selected: ExerciseType[],
    genderSelected: Gender,
    gradeSelected: Grade
  ) => {
    setSelectedExercises(selected);
    setGender(genderSelected);
    setGrade(gradeSelected);
    setRawInput({});
    setStep('form'); // Ir al paso de ingreso
  };

  // Calcular resultados
  const handleFinish = () => {
    // Mapear y validar los inputs
    const mappedExercises = selectedExercises
      .map((type) => {
        const val = rawInput[type];
        if (val === undefined || val.trim() === '') return null;

        return {
          type,
          value: parseFloat(val),
        };
      })
      .filter((e): e is { type: ExerciseType; value: number } => e !== null);

    // Si no hay ejercicios válidos, no continuar
    if (mappedExercises.length === 0) {
      alert('Por favor ingresa al menos una marca válida.');
      return;
    }

    // Ejecutar cálculo
    const computed = CalculateSimulation.execute(
      mappedExercises,
      gender,
      grade
    );

    // Convertir resultados para vista
    const formattedResults = Object.fromEntries(
      computed.results.map((r) => [
        r.exerciseType,
        { puntos: r.points, nota: r.note },
      ])
    );

    setResults(formattedResults);
    setStep('results');
  };

  // Reiniciar flujo completo
  const handleRestart = () => {
    setStep('input');
    setSelectedExercises([]);
    setRawInput({});
    setResults({});
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, mb: 8, px: 2 }}>
      <Paper sx={{ p: 3 }}>
        {step === 'input' && <SimulationInputView onStart={handleStart} />}

        {step === 'form' && (
          <SimulationView
            selectedExercises={selectedExercises}
            rawInput={rawInput}
            setRawInput={setRawInput}
            onNext={handleFinish}
          />
        )}

        {step === 'results' && (
          <SimulationResultsView
            results={results}
            rawInput={rawInput}
            selectedExercises={selectedExercises}
            gender={gender}
            grade={grade}
            onRestart={handleRestart}
          />
        )}
      </Paper>
    </Box>
  );
};
