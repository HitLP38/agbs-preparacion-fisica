// ============================================
// src/domain/entities/Simulation.ts
// ============================================

import { ExerciseType, Gender, Grade } from './Exercise';

export interface ExerciseResult {
  exerciseType: ExerciseType;
  gender: Gender;
  grade: Grade;
  value: number; // El resultado del aspirante
  points: number; // Puntos obtenidos según baremo
  isApto: boolean; // Si supera el mínimo (>= 20 puntos)
  note: number; // Nota calculada según tabla de conversión
}

export interface SimulationData {
  id: string;
  timestamp: Date;
  gender: Gender;
  grade: Grade;
  results: ExerciseResult[];
  totalPoints: number;
  averageNote: number;
  isGlobalApto: boolean; // Todos los ejercicios son APTO
}

export interface UserProfile {
  name?: string;
  gender: Gender;
  preferredGrade: Grade;
  createdAt: Date;
  lastUpdated: Date;
}

// Interfaces para el histórico y análisis
export interface SimulationSummary {
  id: string;
  timestamp: Date;
  grade: Grade;
  totalPoints: number;
  averageNote: number;
  isGlobalApto: boolean;
}

export interface ProgressData {
  exerciseType: ExerciseType;
  simulations: Array<{
    timestamp: Date;
    value: number;
    points: number;
    note: number;
  }>;
  trend: 'improving' | 'stable' | 'declining';
  bestResult: {
    value: number;
    points: number;
    note: number;
    timestamp: Date;
  };
  latestResult: {
    value: number;
    points: number;
    note: number;
    timestamp: Date;
  };
}

// Estados posibles de simulación
export enum SimulationStatus {
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

// Metadata adicional para simulaciones
export interface SimulationMetadata {
  device?: string;
  location?: string;
  notes?: string;
  weather?: string;
  trainingContext?: string;
}

// Simulación extendida con metadata
export interface ExtendedSimulationData extends SimulationData {
  status: SimulationStatus;
  metadata?: SimulationMetadata;
}

// Configuración de objetivos personales
export interface PersonalGoals {
  targetGrade: Grade;
  targetPoints: number;
  targetNote: number;
  targetDate?: Date;
  exerciseGoals: Array<{
    exerciseType: ExerciseType;
    targetValue: number;
    targetPoints: number;
  }>;
}

// Estadísticas globales del usuario
export interface UserStats {
  totalSimulations: number;
  bestSimulation: SimulationSummary;
  averagePoints: number;
  averageNote: number;
  aptoPercentage: number;
  exerciseStats: Array<{
    exerciseType: ExerciseType;
    bestValue: number;
    bestPoints: number;
    averageValue: number;
    averagePoints: number;
    improvementRate: number; // Porcentaje de mejora
  }>;
  recentActivity: SimulationSummary[];
}
