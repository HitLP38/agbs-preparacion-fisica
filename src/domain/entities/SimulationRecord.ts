// src/domain/entities/SimulationRecord.ts

import { ExerciseType, Gender, Grade } from './Exercise';

// Resultado por ejercicio individual
export interface ExerciseResult {
  type: ExerciseType;
  marca: string; // Marca ingresada (ej: '3:45', '50')
  puntos: number; // Puntaje obtenido
  nota: number; // Nota final (puede ser igual a puntos o escalada)
}

// Entidad completa de una simulación
export interface SimulationRecord {
  id: string; // UUID único
  userId: string; // Relación con el usuario
  gender: Gender; // Sexo usado para el cálculo
  grade: Grade; // Grado del usuario
  date: string; // Fecha y hora (ISO)
  results: ExerciseResult[]; // Resultados por ejercicio
  finalScore: number; // Promedio final
}
