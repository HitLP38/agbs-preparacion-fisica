import type { TipoEjercicio, Sexo, Grado, EjercicioInfo } from "../types/agbs";

// ===================================================================
// CONSTANTES AGBS
// ===================================================================

export const EJERCICIOS: Record<string, TipoEjercicio> = {
  SALTO_VERTICAL: "salto_vertical",
  FLEXIONES: "flexiones",
  CARRERA_50M: "carrera_50m",
  CARRERA_1000M: "carrera_1000m",
  NATACION_50M: "natacion_50m",
  CIRCUITO_AGILIDAD: "circuito_agilidad",
} as const;

export const SEXO: Record<string, Sexo> = {
  HOMBRE: "H",
  MUJER: "M",
} as const;

export const GRADO: Record<string, Grado> = {
  GRADO_1: "grado_1",
  GRADO_2: "grado_2",
  GRADO_3: "grado_3",
} as const;

// ===================================================================
// TABLA DE MARCAS OFICIALES AGBS
// ===================================================================

export const TABLA_MARCAS: Record<TipoEjercicio, EjercicioInfo> = {
  [EJERCICIOS.SALTO_VERTICAL]: {
    descripcion: "Salto vertical con pies juntos",
    unidad: "cm",
    tipo: "mayor_mejor",
    marcas: {
      [SEXO.HOMBRE]: {
        [GRADO.GRADO_1]: 42,
        [GRADO.GRADO_2]: 46,
        [GRADO.GRADO_3]: 46,
      },
      [SEXO.MUJER]: {
        [GRADO.GRADO_1]: 36,
        [GRADO.GRADO_2]: 40,
        [GRADO.GRADO_3]: 40,
      },
    },
  },

  [EJERCICIOS.FLEXIONES]: {
    descripcion: "Flexiones de brazos",
    unidad: "repeticiones",
    tipo: "mayor_mejor",
    marcas: {
      [SEXO.HOMBRE]: {
        [GRADO.GRADO_1]: 18,
        [GRADO.GRADO_2]: 22,
        [GRADO.GRADO_3]: 22,
      },
      [SEXO.MUJER]: {
        [GRADO.GRADO_1]: 12,
        [GRADO.GRADO_2]: 16,
        [GRADO.GRADO_3]: 16,
      },
    },
  },

  [EJERCICIOS.CARRERA_50M]: {
    descripcion: "Carrera 50 metros",
    unidad: "segundos",
    tipo: "menor_mejor",
    marcas: {
      [SEXO.HOMBRE]: {
        [GRADO.GRADO_1]: 8.0,
        [GRADO.GRADO_2]: 7.8,
        [GRADO.GRADO_3]: 7.8,
      },
      [SEXO.MUJER]: {
        [GRADO.GRADO_1]: 8.8,
        [GRADO.GRADO_2]: 8.6,
        [GRADO.GRADO_3]: 8.6,
      },
    },
  },

  [EJERCICIOS.CARRERA_1000M]: {
    descripcion: "Carrera 1000 metros",
    unidad: "segundos",
    tipo: "menor_mejor",
    marcas: {
      [SEXO.HOMBRE]: {
        [GRADO.GRADO_1]: 235, // 3:55
        [GRADO.GRADO_2]: 225, // 3:45
        [GRADO.GRADO_3]: 225,
      },
      [SEXO.MUJER]: {
        [GRADO.GRADO_1]: 265, // 4:25
        [GRADO.GRADO_2]: 255, // 4:15
        [GRADO.GRADO_3]: 255,
      },
    },
  },

  [EJERCICIOS.NATACION_50M]: {
    descripcion: "Natación 50m estilo libre",
    unidad: "segundos",
    tipo: "menor_mejor",
    marcas: {
      [SEXO.HOMBRE]: {
        [GRADO.GRADO_1]: 60, // 1:00
        [GRADO.GRADO_2]: 58, // 0:58
        [GRADO.GRADO_3]: 58,
      },
      [SEXO.MUJER]: {
        [GRADO.GRADO_1]: 68, // 1:08
        [GRADO.GRADO_2]: 66, // 1:06
        [GRADO.GRADO_3]: 66,
      },
    },
  },

  [EJERCICIOS.CIRCUITO_AGILIDAD]: {
    descripcion: "Circuito de agilidad",
    unidad: "segundos",
    tipo: "menor_mejor",
    marcas: {
      [SEXO.HOMBRE]: {
        [GRADO.GRADO_1]: 14,
        [GRADO.GRADO_2]: 14,
        [GRADO.GRADO_3]: 14,
      },
      [SEXO.MUJER]: {
        [GRADO.GRADO_1]: 16,
        [GRADO.GRADO_2]: 16,
        [GRADO.GRADO_3]: 16,
      },
    },
  },
};

// ===================================================================
// LISTAS PARA FORMULARIOS
// ===================================================================

export const LISTA_EJERCICIOS = [
  { value: EJERCICIOS.SALTO_VERTICAL, label: "Salto Vertical" },
  { value: EJERCICIOS.FLEXIONES, label: "Flexiones de Brazos" },
  { value: EJERCICIOS.CARRERA_50M, label: "Carrera 50m" },
  { value: EJERCICIOS.CARRERA_1000M, label: "Carrera 1000m" },
  { value: EJERCICIOS.NATACION_50M, label: "Natación 50m" },
  { value: EJERCICIOS.CIRCUITO_AGILIDAD, label: "Circuito de Agilidad" },
];

export const LISTA_SEXO = [
  { value: SEXO.HOMBRE, label: "Hombre" },
  { value: SEXO.MUJER, label: "Mujer" },
];

export const LISTA_GRADO = [
  { value: GRADO.GRADO_1, label: "Grado 1 (Sin Titulación)" },
  { value: GRADO.GRADO_2, label: "Grado 2 (Con Titulación)" },
  { value: GRADO.GRADO_3, label: "Grado 3 (Con Titulación)" },
];

// ===================================================================
// UTILIDADES
// ===================================================================

export const tiempoASegundos = (minutos: number, segundos: number): number => {
  return minutos * 60 + segundos;
};

export const segundosATiempo = (segundosTotales: number) => {
  const minutos = Math.floor(segundosTotales / 60);
  const segundos = segundosTotales % 60;
  return {
    minutos,
    segundos,
    formato: `${minutos}:${segundos.toString().padStart(2, "0")}`,
  };
};
// ===================================================================
// SISTEMA DE PUNTUACIÓN NUMÉRICA SEGÚN PDF OFICIAL
// ===================================================================

export const TABLA_PUNTUACION = {
  [EJERCICIOS.SALTO_VERTICAL]: {
    // Hombres - Salto Vertical
    H: {
      // Tabla de puntos por centímetros (ejemplo basado en PDF)
      70: 40,
      69: 38,
      68: 36,
      67: 34,
      66: 32,
      65: 30,
      64: 28,
      63: 26,
      62: 24,
      61: 22,
      60: 20,
      59: 18,
      58: 16,
      57: 14,
      56: 12,
      55: 10,
      54: 8,
      53: 6,
      52: 4,
      51: 2,
      50: 1,
      49: 1,
      48: 1,
      47: 1,
      46: 1,
      45: 1,
      44: 1,
      43: 1,
      42: 1,
    },
    // Mujeres - Salto Vertical
    M: {
      64: 40,
      63: 38,
      62: 36,
      61: 34,
      60: 32,
      59: 30,
      58: 28,
      57: 26,
      56: 24,
      55: 22,
      54: 20,
      53: 18,
      52: 16,
      51: 14,
      50: 12,
      49: 10,
      48: 8,
      47: 6,
      46: 4,
      45: 2,
      44: 1,
      43: 1,
      42: 1,
      41: 1,
      40: 1,
      39: 1,
      38: 1,
      37: 1,
      36: 1,
    },
  },

  [EJERCICIOS.FLEXIONES]: {
    // Hombres - Flexiones
    H: {
      60: 40,
      59: 38,
      58: 36,
      57: 34,
      56: 32,
      55: 30,
      54: 28,
      53: 26,
      52: 24,
      51: 22,
      50: 20,
      49: 18,
      48: 16,
      47: 14,
      46: 12,
      45: 10,
      44: 8,
      43: 6,
      42: 4,
      41: 2,
      40: 1,
      39: 1,
      38: 1,
      37: 1,
      36: 1,
      35: 1,
      34: 1,
      33: 1,
      32: 1,
      31: 1,
      30: 1,
      29: 1,
      28: 1,
      27: 1,
      26: 1,
      25: 1,
      24: 1,
      23: 1,
      22: 1,
    },
    // Mujeres - Flexiones
    M: {
      54: 40,
      53: 38,
      52: 36,
      51: 34,
      50: 32,
      49: 30,
      48: 28,
      47: 26,
      46: 24,
      45: 22,
      44: 20,
      43: 18,
      42: 16,
      41: 14,
      40: 12,
      39: 10,
      38: 8,
      37: 6,
      36: 4,
      35: 2,
      34: 1,
      33: 1,
      32: 1,
      31: 1,
      30: 1,
      29: 1,
      28: 1,
      27: 1,
      26: 1,
      25: 1,
      24: 1,
      23: 1,
      22: 1,
      21: 1,
      20: 1,
      19: 1,
      18: 1,
      17: 1,
      16: 1,
    },
  },
  // ... más ejercicios según necesites
};

/**
 * Calcula puntuación numérica según tablas oficiales
 */
export const calcularPuntuacion = (
  ejercicio: TipoEjercicio,
  resultado: number,
  sexo: Sexo
): number => {
  const tabla = TABLA_PUNTUACION[ejercicio]?.[sexo];
  if (!tabla) return 0;

  // Buscar puntuación exacta o la más cercana inferior
  const marcas = Object.keys(tabla)
    .map(Number)
    .sort((a, b) => b - a);

  for (const marca of marcas) {
    if (resultado >= marca) {
      return tabla[marca];
    }
  }

  return 0; // No alcanza puntuación mínima
};

/**
 * Convierte puntos a nota (5.0 - 10.0)
 */
export const puntosANota = (puntos: number): number => {
  // Según tabla de transformación del PDF
  if (puntos >= 240) return 10.0;
  if (puntos >= 200) return 9.0;
  if (puntos >= 160) return 8.0;
  if (puntos >= 120) return 7.0;
  if (puntos >= 80) return 6.0;
  if (puntos >= 40) return 5.5;
  if (puntos >= 20) return 5.2;
  if (puntos >= 10) return 5.1;
  if (puntos >= 5) return 5.0;
  return 0; // Insuficiente
};
