export enum ExerciseType {
  SALTO_VERTICAL = 'SALTO_VERTICAL',
  EXTENSIONES_BRAZOS = 'EXTENSIONES_BRAZOS',
  CARRERA_50M = 'CARRERA_50M',
  CARRERA_1000M = 'CARRERA_1000M',
  NATACION_50M = 'NATACION_50M',
  CARRERA_6KM = 'CARRERA_6KM',
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'H',
}

export enum Grade {
  FIRST = '1º EMIEOF. Y EMIES CGET',
  SECOND = '2º EMIEOF. Y EMIES CGET',
  THIRD = '3º EMIEOF. Y EMIES CGET',
}

export interface Exercise {
  type: ExerciseType;
  unit: string;
  description: string;
  isTimeBasedReverse?: boolean; // Para ejercicios donde menor tiempo = más puntos
}

// Definiciones de ejercicios con sus características
export const EXERCISE_DEFINITIONS: Record<ExerciseType, Exercise> = {
  [ExerciseType.SALTO_VERTICAL]: {
    type: ExerciseType.SALTO_VERTICAL,
    unit: 'cm',
    description: 'Salto Vertical',
    isTimeBasedReverse: false,
  },
  [ExerciseType.EXTENSIONES_BRAZOS]: {
    type: ExerciseType.EXTENSIONES_BRAZOS,
    unit: 'repeticiones',
    description: 'Extensiones de Brazos',
    isTimeBasedReverse: false,
  },
  [ExerciseType.CARRERA_50M]: {
    type: ExerciseType.CARRERA_50M,
    unit: 'segundos',
    description: 'Carrera 50 metros lisos',
    isTimeBasedReverse: true,
  },
  [ExerciseType.CARRERA_1000M]: {
    type: ExerciseType.CARRERA_1000M,
    unit: 'minutos:segundos',
    description: 'Carrera 1000 metros',
    isTimeBasedReverse: true,
  },
  [ExerciseType.NATACION_50M]: {
    type: ExerciseType.NATACION_50M,
    unit: 'segundos',
    description: 'Natación 50 metros',
    isTimeBasedReverse: true,
  },
  [ExerciseType.CARRERA_6KM]: {
    type: ExerciseType.CARRERA_6KM,
    unit: 'minutos:segundos',
    description: 'Carrera 6 kilómetros',
    isTimeBasedReverse: true,
  },
};
