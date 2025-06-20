// src/domain/usecases/CalculateSimulation.ts

import { ExerciseType, Gender, Grade } from '@/domain/entities/Exercise';
import {
  calcularPuntos,
  isApto,
  pointsToNote,
} from '@/domain/services/BaremoService';

// Resultado individual de un ejercicio
export interface ExerciseResult {
  exerciseType: ExerciseType;
  gender: Gender;
  grade: Grade;
  value: number;
  points: number;
  note: number;
  isApto: boolean;
}

// Resultado de una simulación completa
export interface SimulationData {
  id: string;
  timestamp: Date;
  gender: Gender;
  grade: Grade;
  results: ExerciseResult[];
  totalPoints: number;
  averageNote: number;
  isGlobalApto: boolean;
}

export class CalculateSimulation {
  static execute(
    exercises: Array<{
      type: ExerciseType;
      value: number;
    }>,
    gender: Gender,
    grade: Grade
  ): SimulationData {
    const results: ExerciseResult[] = exercises.map((exercise) => {
      const points = calcularPuntos(
        exercise.type,
        exercise.value.toString(),
        gender,
        grade
      );

      return {
        exerciseType: exercise.type,
        gender,
        grade,
        value: exercise.value,
        points,
        note: pointsToNote(points),
        isApto: isApto(points),
      };
    });

    const totalPoints = results.reduce((acc, r) => acc + r.points, 0);
    const averageNote =
      results.reduce((acc, r) => acc + r.note, 0) / results.length;
    const isGlobalApto = results.every((r) => r.isApto);

    return {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      gender,
      grade,
      results,
      totalPoints,
      averageNote: Number(averageNote.toFixed(2)),
      isGlobalApto,
    };
  }
}
