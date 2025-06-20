// src/domain/entities/User.ts

import { Gender, Grade } from './Exercise';

export interface User {
  id: string; // UUID único del usuario
  name: string; // Nombre del usuario
  email?: string; // Correo si se registró
  gender: Gender; // Sexo biológico
  grade: Grade; // Grado militar actual
  createdAt?: string; // Fecha de creación
  updatedAt?: string; // Última modificación
}
