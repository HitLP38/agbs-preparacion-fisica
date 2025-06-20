// ==============================================
// src/views/Profile/ProfileView.tsx
// Vista para que el usuario complete su perfil
// ==============================================

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { Gender, Grade } from '@/domain/entities/Exercise';
import { useUser } from '@clerk/clerk-react';

// Tipos para el perfil local
interface UserProfileData {
  gender: Gender;
  grade: Grade;
}

// Intenta cargar perfil desde localStorage (provisional hasta que tengamos backend)
const getStoredProfile = (): UserProfileData | null => {
  const stored = localStorage.getItem('userProfile');
  return stored ? JSON.parse(stored) : null;
};

// Guarda perfil en localStorage
const saveProfile = (profile: UserProfileData) => {
  localStorage.setItem('userProfile', JSON.stringify(profile));
};

export const ProfileView: React.FC = () => {
  const { user } = useUser(); // Usuario actual de Clerk

  // Estado local para los campos
  const [profile, setProfile] = useState<UserProfileData>({
    gender: Gender.MALE,
    grade: Grade.FIRST,
  });

  // Cargar perfil al iniciar
  useEffect(() => {
    const stored = getStoredProfile();
    if (stored) {
      setProfile(stored);
    }
  }, []);

  // Actualizar campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar al hacer clic
  const handleSave = () => {
    saveProfile(profile);
    alert('Perfil guardado correctamente ✅');
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Mi Perfil
      </Typography>

      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardContent>
          {/* Nombre */}
          <TextField
            label="Nombre"
            value={user?.fullName || ''}
            disabled
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Género */}
          <TextField
            select
            fullWidth
            name="gender"
            label="Género"
            value={profile.gender}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value={Gender.MALE}>Masculino</MenuItem>
            <MenuItem value={Gender.FEMALE}>Femenino</MenuItem>
          </TextField>

          {/* Grado */}
          <TextField
            select
            fullWidth
            name="grade"
            label="Grado"
            value={profile.grade}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value={Grade.FIRST}>1º EMIEOF. Y EMIES CGET</MenuItem>
            <MenuItem value={Grade.SECOND}>2º EMIEOF. Y EMIES CGET</MenuItem>
            <MenuItem value={Grade.THIRD}>3º EMIEOF. Y EMIES CGET</MenuItem>
          </TextField>

          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSave}
          >
            Guardar Perfil
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
