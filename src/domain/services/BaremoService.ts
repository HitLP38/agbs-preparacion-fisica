// src/domain/services/BaremoService.ts

import { ExerciseType, Gender, Grade } from '@/domain/entities/Exercise';

// ✅ Tabla mock con todos los ejercicios definidos, aunque no tengan datos aún
const mockTable: Record<
  Gender,
  Record<Grade, Record<ExerciseType, { marca: number; puntos: number }[]>>
> = {
  [Gender.MALE]: {
    [Grade.FIRST]: {
      [ExerciseType.SALTO_VERTICAL]: [
        { marca: 40, puntos: 3 },
        { marca: 45, puntos: 5 },
        { marca: 50, puntos: 7 },
      ],
      [ExerciseType.EXTENSIONES_BRAZOS]: [],
      [ExerciseType.CARRERA_50M]: [],
      [ExerciseType.CARRERA_1000M]: [],
      [ExerciseType.NATACION_50M]: [],
      [ExerciseType.CARRERA_6KM]: [],
    },
    [Grade.SECOND]: {
      [ExerciseType.SALTO_VERTICAL]: [],
      [ExerciseType.EXTENSIONES_BRAZOS]: [],
      [ExerciseType.CARRERA_50M]: [],
      [ExerciseType.CARRERA_1000M]: [],
      [ExerciseType.NATACION_50M]: [],
      [ExerciseType.CARRERA_6KM]: [],
    },
    [Grade.THIRD]: {
      [ExerciseType.SALTO_VERTICAL]: [],
      [ExerciseType.EXTENSIONES_BRAZOS]: [],
      [ExerciseType.CARRERA_50M]: [],
      [ExerciseType.CARRERA_1000M]: [],
      [ExerciseType.NATACION_50M]: [],
      [ExerciseType.CARRERA_6KM]: [],
    },
  },

  [Gender.FEMALE]: {
    [Grade.FIRST]: {
      [ExerciseType.SALTO_VERTICAL]: [
        { marca: 35, puntos: 3 },
        { marca: 40, puntos: 5 },
        { marca: 45, puntos: 7 },
      ],
      [ExerciseType.EXTENSIONES_BRAZOS]: [],
      [ExerciseType.CARRERA_50M]: [],
      [ExerciseType.CARRERA_1000M]: [],
      [ExerciseType.NATACION_50M]: [],
      [ExerciseType.CARRERA_6KM]: [],
    },
    [Grade.SECOND]: {
      [ExerciseType.SALTO_VERTICAL]: [],
      [ExerciseType.EXTENSIONES_BRAZOS]: [],
      [ExerciseType.CARRERA_50M]: [],
      [ExerciseType.CARRERA_1000M]: [],
      [ExerciseType.NATACION_50M]: [],
      [ExerciseType.CARRERA_6KM]: [],
    },
    [Grade.THIRD]: {
      [ExerciseType.SALTO_VERTICAL]: [],
      [ExerciseType.EXTENSIONES_BRAZOS]: [],
      [ExerciseType.CARRERA_50M]: [],
      [ExerciseType.CARRERA_1000M]: [],
      [ExerciseType.NATACION_50M]: [],
      [ExerciseType.CARRERA_6KM]: [],
    },
  },
};

// 🔁 Convierte marcas tipo "min:seg" a segundos o strings numéricos a números
function convertirMarcaANumero(marca: string): number {
  if (marca.includes(':')) {
    const [min, seg] = marca.split(':').map(Number);
    return min * 60 + seg;
  }
  return parseFloat(marca);
}

// 🧮 Calcula los puntos según la marca ingresada
export function calcularPuntos(
  tipo: ExerciseType,
  marca: string,
  sexo: Gender,
  grado: Grade
): number {
  const tabla = mockTable[sexo]?.[grado]?.[tipo];
  if (!tabla || tabla.length === 0) return 0;

  const marcaNum = convertirMarcaANumero(marca);

  let puntos = 0;
  for (const entrada of tabla) {
    if (marcaNum >= entrada.marca) {
      puntos = entrada.puntos;
    }
  }

  return puntos;
}

// 📈 Convierte puntos en nota (simple: misma escala)
export function pointsToNote(puntos: number): number {
  return puntos;
}

// ✅ Determina si el resultado es APTO
export function isApto(puntos: number): boolean {
  return puntos >= 5;
}
