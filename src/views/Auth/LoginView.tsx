// src/views/Auth/LoginView.tsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';

import { useAuth } from '@/app/context/AuthContext';
import { ExerciseType, Gender, Grade } from '@/domain/entities/Exercise';
import { User } from '@/domain/entities/User';

interface Props {
  onLoginSuccess: () => void; // redirecciona a dashboard
}

export const LoginView: React.FC<Props> = ({ onLoginSuccess }) => {
  const { login } = useAuth();

  // Estados locales del formulario
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [grade, setGrade] = useState<Grade>(Grade.FIRST);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      gender,
      grade,
    };

    login(newUser);
    onLoginSuccess(); // redirigir
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Iniciar Sesión / Registrarse
      </Typography>

      <TextField
        label="Nombre completo"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Género</InputLabel>
        <Select
          value={gender}
          label="Género"
          onChange={(e) => setGender(e.target.value as Gender)}
        >
          <MenuItem value={Gender.MALE}>Masculino</MenuItem>
          <MenuItem value={Gender.FEMALE}>Femenino</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Grado</InputLabel>
        <Select
          value={grade}
          label="Grado"
          onChange={(e) => setGrade(e.target.value as Grade)}
        >
          {Object.values(Grade).map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
};
