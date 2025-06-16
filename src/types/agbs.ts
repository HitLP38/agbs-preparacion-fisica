// ===================================================================
// TIPOS TYPESCRIPT PARA AGBS
// ===================================================================

export type Sexo = "H" | "M";

export type Grado = "grado_1" | "grado_2" | "grado_3";

export type TipoEjercicio =
  | "salto_vertical"
  | "flexiones"
  | "carrera_50m"
  | "carrera_1000m"
  | "natacion_50m"
  | "circuito_agilidad";

export type Calificacion = "APTO" | "NO APTO";

export interface MarcaMinima {
  [sexo: string]: {
    [grado: string]: number;
  };
}

export interface EjercicioInfo {
  descripcion: string;
  unidad: string;
  tipo: "mayor_mejor" | "menor_mejor";
  marcas: MarcaMinima;
}

export interface ResultadoEjercicio {
  ejercicio: string;
  resultado: number;
  marcaMinima: number;
  unidad: string;
  calificacion: Calificacion;
  esApto: boolean;
  diferencia: number;
  mensaje: string;
  fecha: string;
  error?: boolean;
}

export interface ParametrosUsuario {
  sexo: Sexo;
  grado: Grado;
  ejercicio: TipoEjercicio;
}
