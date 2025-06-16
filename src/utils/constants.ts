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
