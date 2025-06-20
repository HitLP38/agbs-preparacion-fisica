// ==========================================================
// src/views/Simulation/SimulationInputView.tsx
// Vista para que el usuario seleccione ejercicios y datos personales
// ==========================================================

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  ExerciseType,
  EXERCISE_DEFINITIONS,
  Gender,
  Grade,
} from '@/domain/entities/Exercise';

interface Props {
  onStart: (
    selectedExercises: ExerciseType[],
    gender: Gender,
    grade: Grade
  ) => void;
}

// Helper para precargar perfil si existe
const getStoredProfile = (): { gender: Gender; grade: Grade } | null => {
  const stored = localStorage.getItem('userProfile');
  return stored ? JSON.parse(stored) : null;
};

export const SimulationInputView: React.FC<Props> = ({ onStart }) => {
  const [selected, setSelected] = useState<ExerciseType[]>([]);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [grade, setGrade] = useState<Grade>(Grade.FIRST);

  // Cargar datos del perfil si existen
  useEffect(() => {
    const profile = getStoredProfile();
    if (profile) {
      setGender(profile.gender);
      setGrade(profile.grade);
    }
  }, []);

  // Alternar selección de ejercicios
  const toggleExercise = (type: ExerciseType) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleStart = () => {
    if (selected.length === 0) {
      alert('Selecciona al menos un ejercicio para continuar.');
      return;
    }

    onStart(selected, gender, grade);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Configura tu Simulación
      </Typography>

      {/* Sección: Datos personales */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Datos del Aspirante
          </Typography>

          {/* Género */}
          <TextField
            select
            fullWidth
            label="Género"
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            sx={{ mb: 2 }}
          >
            <MenuItem value={Gender.MALE}>Masculino</MenuItem>
            <MenuItem value={Gender.FEMALE}>Femenino</MenuItem>
          </TextField>

          {/* Grado */}
          <TextField
            select
            fullWidth
            label="Grado"
            value={grade}
            onChange={(e) => setGrade(e.target.value as Grade)}
          >
            <MenuItem value={Grade.FIRST}>1º EMIEOF. Y EMIES CGET</MenuItem>
            <MenuItem value={Grade.SECOND}>2º EMIEOF. Y EMIES CGET</MenuItem>
            <MenuItem value={Grade.THIRD}>3º EMIEOF. Y EMIES CGET</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      {/* Sección: Selección de ejercicios */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Selecciona los ejercicios
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {Object.values(ExerciseType).map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selected.includes(type)}
                    onChange={() => toggleExercise(type)}
                  />
                }
                label={EXERCISE_DEFINITIONS[type].description}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Botón de inicio */}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStart}
        >
          Iniciar Simulación
        </Button>
      </Box>
    </Box>
  );
};
