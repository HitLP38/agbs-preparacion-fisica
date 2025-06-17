// ============================================
// src/domain/services/BaremoService.ts - VERSIÓN CON DATOS MOCK
// ============================================
import { ExerciseType, Gender, Grade } from '../entities/Exercise';

export interface BaremoEntry {
  value: number;
  points: number;
}

export interface BaremoTable {
  [grade: string]: {
    [exerciseType: string]: {
      [gender: string]: BaremoEntry[];
    };
  };
}

// Tabla de conversión de puntos a notas (del BOE)
export const POINTS_TO_NOTES_TABLE: Record<number, number> = {
  240: 10.0,
  239: 9.9992,
  238: 9.9777,
  237: 9.9665,
  236: 9.945,
  235: 9.9235,
  234: 9.902,
  233: 9.8805,
  232: 9.859,
  231: 9.8375,
  230: 9.816,
  229: 9.7945,
  228: 9.773,
  227: 9.7515,
  226: 9.73,
  225: 9.7085,
  224: 9.687,
  223: 9.6655,
  222: 9.644,
  221: 9.6225,
  220: 9.601,
  219: 9.5795,
  218: 9.558,
  217: 9.5365,
  216: 9.515,
  215: 9.4935,
  214: 9.472,
  213: 9.4505,
  212: 9.429,
  211: 9.4075,
  210: 9.386,
  209: 9.3645,
  208: 9.343,
  207: 9.3215,
  206: 9.3,
  205: 9.2785,
  204: 9.257,
  203: 9.2355,
  202: 9.214,
  201: 9.1925,
  200: 9.171,
  199: 9.1495,
  198: 9.128,
  197: 9.1065,
  196: 9.085,
  195: 9.0635,
  194: 9.042,
  193: 9.0205,
  192: 8.999,
  191: 8.9775,
  190: 8.956,
  189: 8.9345,
  188: 8.913,
  187: 8.8915,
  186: 8.87,
  185: 8.8485,
  184: 8.827,
  183: 8.8055,
  182: 8.784,
  181: 8.7625,
  180: 8.741,
  179: 8.7195,
  178: 8.698,
  177: 8.6765,
  176: 8.655,
  175: 8.6335,
  174: 8.612,
  173: 8.5905,
  172: 8.569,
  171: 8.5475,
  170: 8.526,
  169: 8.5045,
  168: 8.483,
  167: 8.4615,
  166: 8.44,
  165: 8.4185,
  164: 8.397,
  163: 8.3755,
  162: 8.354,
  161: 8.3325,
  160: 8.311,
  159: 8.2895,
  158: 8.268,
  157: 8.2465,
  156: 8.225,
  155: 8.2035,
  154: 8.182,
  153: 8.1605,
  152: 8.139,
  151: 8.1175,
  150: 8.096,
  149: 8.0745,
  148: 8.053,
  147: 8.0315,
  146: 8.01,
  145: 7.9885,
  144: 7.967,
  143: 7.9455,
  142: 7.924,
  141: 7.9025,
  140: 7.881,
  139: 7.8595,
  138: 7.838,
  137: 7.8165,
  136: 7.795,
  50: 6.0105,
  49: 5.989,
  48: 5.9675,
  47: 5.946,
  46: 5.9245,
  45: 5.903,
  44: 5.8815,
  43: 5.86,
  42: 5.8385,
  41: 5.817,
  40: 5.7955,
  39: 5.774,
  38: 5.7525,
  37: 5.731,
  36: 5.7095,
  35: 5.688,
  34: 5.6665,
  33: 5.645,
  32: 5.6235,
  31: 5.602,
  30: 5.5805,
  29: 5.559,
  28: 5.5375,
  27: 5.516,
  26: 5.4945,
  25: 5.473,
  24: 5.4515,
  23: 5.43,
  22: 5.4085,
  21: 5.387,
  20: 5.3655,
  19: 5.344,
  18: 5.3225,
  17: 5.301,
  16: 5.2795,
  15: 5.258,
  14: 5.2365,
  13: 5.215,
  12: 5.1935,
  11: 5.172,
  10: 5.1505,
  9: 5.129,
  8: 5.1075,
  7: 5.086,
  6: 5.0645,
};

export class BaremoService {
  private static readonly MIN_APTO_POINTS = 20;

  static calculatePoints(
    exerciseType: ExerciseType,
    gender: Gender,
    grade: Grade,
    value: number
  ): number {
    const baremoTable = this.getBaremoTable();
    const exerciseTable = baremoTable[grade]?.[exerciseType]?.[gender];

    if (!exerciseTable) {
      /* console.warn(
        `Baremo no encontrado para ${exerciseType} ${gender} ${grade}, usando datos mock`
      );*/
      // Retornar datos mock mientras implementamos baremos reales
      return this.calculateMockPoints(exerciseType, value);
    }

    const isTimeBasedReverse = [
      ExerciseType.CARRERA_50M,
      ExerciseType.CARRERA_1000M,
      ExerciseType.NATACION_50M,
      ExerciseType.CARRERA_6KM,
    ].includes(exerciseType);

    return this.interpolatePoints(exerciseTable, value, isTimeBasedReverse);
  }

  /**
   * DATOS MOCK para testing mientras implementamos baremos reales
   */
  private static calculateMockPoints(
    exerciseType: ExerciseType,
    value: number
  ): number {
    // Algoritmos mock basados en valores típicos
    switch (exerciseType) {
      case ExerciseType.SALTO_VERTICAL:
        // Salto: 30cm=20pts, 50cm=40pts
        return Math.max(0, Math.min(40, Math.floor((value - 15) * 1.25)));

      case ExerciseType.EXTENSIONES_BRAZOS:
        // Extensiones: 15rep=20pts, 35rep=40pts
        return Math.max(0, Math.min(40, Math.floor((value - 5) * 1.25)));

      case ExerciseType.CARRERA_50M:
        // 50m: 10seg=40pts, 6seg=20pts (menor tiempo = más puntos)
        return Math.max(0, Math.min(40, Math.floor((12 - value) * 5)));

      case ExerciseType.CARRERA_1000M:
        // 1000m: 180seg=40pts, 300seg=20pts (menor tiempo = más puntos)
        return Math.max(0, Math.min(40, Math.floor((360 - value) / 4.5)));

      case ExerciseType.NATACION_50M:
        // Natación: 30seg=40pts, 60seg=20pts (menor tiempo = más puntos)
        return Math.max(0, Math.min(40, Math.floor((70 - value) * 1.33)));

      case ExerciseType.CARRERA_6KM:
        // 6km: 1200seg=40pts, 2100seg=20pts (menor tiempo = más puntos)
        return Math.max(0, Math.min(40, Math.floor((2400 - value) / 22.5)));

      default:
        return 25; // Valor por defecto
    }
  }

  static pointsToNote(points: number): number {
    // Buscar valor exacto en la tabla
    if (points in POINTS_TO_NOTES_TABLE) {
      return POINTS_TO_NOTES_TABLE[points];
    }

    // Interpolación lineal para valores intermedios
    const pointKeys = Object.keys(POINTS_TO_NOTES_TABLE)
      .map(Number)
      .sort((a, b) => b - a);

    for (let i = 0; i < pointKeys.length - 1; i++) {
      const upperPoints = pointKeys[i];
      const lowerPoints = pointKeys[i + 1];

      if (points <= upperPoints && points >= lowerPoints) {
        const upperNote = POINTS_TO_NOTES_TABLE[upperPoints];
        const lowerNote = POINTS_TO_NOTES_TABLE[lowerPoints];

        const ratio = (points - lowerPoints) / (upperPoints - lowerPoints);
        return Number((lowerNote + (upperNote - lowerNote) * ratio).toFixed(4));
      }
    }

    // Si está fuera del rango, devolver el mínimo
    return 5.0;
  }

  static isApto(points: number): boolean {
    return points >= this.MIN_APTO_POINTS;
  }

  private static interpolatePoints(
    table: BaremoEntry[],
    value: number,
    isTimeBasedReverse: boolean
  ): number {
    const sortedTable = [...table].sort((a, b) =>
      isTimeBasedReverse ? a.value - b.value : b.value - a.value
    );

    // Buscar valor exacto
    const exactMatch = sortedTable.find((entry) => entry.value === value);
    if (exactMatch) return exactMatch.points;

    // Interpolación lineal
    for (let i = 0; i < sortedTable.length - 1; i++) {
      const current = sortedTable[i];
      const next = sortedTable[i + 1];

      const inRange = isTimeBasedReverse
        ? value >= current.value && value <= next.value
        : value <= current.value && value >= next.value;

      if (inRange) {
        const ratio =
          Math.abs(value - current.value) /
          Math.abs(next.value - current.value);
        return Number(
          (current.points + (next.points - current.points) * ratio).toFixed(2)
        );
      }
    }

    return 0;
  }

  /**
   * DATOS MOCK - Tabla de baremos simplificada para testing
   * TODO: Reemplazar con datos reales del PDF BOE
   */
  private static getBaremoTable(): BaremoTable {
    // Por ahora retornamos tabla vacía para usar datos mock
    // En Fase 3 implementaremos los baremos reales del PDF

    // EJEMPLO de cómo se vería con datos reales:
    /*
    return {
      [Grade.FIRST]: {
        [ExerciseType.SALTO_VERTICAL]: {
          [Gender.MALE]: [
            { value: 64, points: 40 },
            { value: 63, points: 38 },
            { value: 62, points: 36 },
            // ... más valores del PDF
          ],
          [Gender.FEMALE]: [
            { value: 57, points: 40 },
            { value: 56, points: 38 },
            // ... más valores del PDF
          ]
        },
        // ... más ejercicios
      },
      // ... más grados
    };
    */

    return {}; // Tabla vacía → usa datos mock
  }
}

// ============================================
// PARA DEBUGGING - Función de prueba
// ============================================
export const testBaremoService = () => {
  console.log('🧪 Testing BaremoService...');

  const testCases = [
    {
      exercise: ExerciseType.SALTO_VERTICAL,
      value: 45,
      expected: 'around 35-40 points',
    },
    {
      exercise: ExerciseType.EXTENSIONES_BRAZOS,
      value: 25,
      expected: 'around 25-30 points',
    },
    {
      exercise: ExerciseType.CARRERA_50M,
      value: 8.0,
      expected: 'around 20-25 points',
    },
  ];

  testCases.forEach(({ exercise, value, expected }) => {
    const points = BaremoService.calculatePoints(
      exercise,
      Gender.MALE,
      Grade.FIRST,
      value
    );
    const note = BaremoService.pointsToNote(points);
    const isApto = BaremoService.isApto(points);

    console.log(
      `📊 ${exercise}: ${value} → ${points} pts, nota ${note.toFixed(2)}, ${isApto ? 'APTO' : 'NO APTO'}`
    );
  });
};
