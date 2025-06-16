import type {
  TipoEjercicio,
  Sexo,
  Grado,
  ResultadoEjercicio,
  ParametrosUsuario,
} from "../types/agbs";
import { TABLA_MARCAS } from "../utils/constants";

// ===================================================================
// TABLA DE PUNTUACIÓN SIMPLIFICADA SEGÚN PDF
// ===================================================================

const TABLA_PUNTOS = {
  salto_vertical: {
    H: { 70: 40, 65: 30, 60: 20, 55: 15, 50: 10, 45: 7, 42: 5, 40: 3, 38: 1 },
    M: { 64: 40, 60: 30, 55: 20, 50: 15, 45: 10, 40: 7, 36: 5, 34: 3, 32: 1 },
  },
  flexiones: {
    H: {
      60: 40,
      55: 35,
      50: 30,
      45: 25,
      40: 20,
      35: 15,
      30: 12,
      25: 10,
      22: 7,
      18: 5,
      15: 3,
      12: 1,
    },
    M: {
      54: 40,
      50: 35,
      45: 30,
      40: 25,
      35: 20,
      30: 15,
      25: 12,
      20: 10,
      16: 7,
      12: 5,
      10: 3,
      8: 1,
    },
  },
  carrera_50m: {
    H: {
      6.5: 40,
      7.0: 35,
      7.5: 30,
      7.8: 25,
      8.0: 20,
      8.2: 15,
      8.5: 10,
      9.0: 5,
      9.5: 1,
    },
    M: {
      7.5: 40,
      8.0: 35,
      8.5: 30,
      8.6: 25,
      8.8: 20,
      9.0: 15,
      9.5: 10,
      10.0: 5,
      10.5: 1,
    },
  },
  carrera_1000m: {
    H: {
      210: 40,
      220: 35,
      225: 30,
      235: 25,
      240: 20,
      250: 15,
      260: 10,
      280: 5,
      300: 1,
    },
    M: {
      240: 40,
      250: 35,
      255: 30,
      265: 25,
      270: 20,
      280: 15,
      300: 10,
      320: 5,
      340: 1,
    },
  },
  natacion_50m: {
    H: { 45: 40, 50: 35, 55: 30, 58: 25, 60: 20, 65: 15, 70: 10, 75: 5, 80: 1 },
    M: { 55: 40, 60: 35, 65: 30, 66: 25, 68: 20, 72: 15, 78: 10, 85: 5, 90: 1 },
  },
  circuito_agilidad: {
    H: { 10: 40, 11: 35, 12: 30, 13: 25, 14: 20, 15: 15, 16: 10, 17: 5, 18: 1 },
    M: { 12: 40, 13: 35, 14: 30, 15: 25, 16: 20, 17: 15, 18: 10, 19: 5, 20: 1 },
  },
};

/**
 * Calcula puntos según tabla oficial
 */
const calcularPuntos = (
  ejercicio: TipoEjercicio,
  resultado: number,
  sexo: Sexo
): number => {
  const tabla = TABLA_PUNTOS[ejercicio]?.[sexo];
  if (!tabla) return 0;

  const marcas = Object.keys(tabla).map(Number).sort();

  // Para ejercicios donde MAYOR es mejor (salto, flexiones)
  if (ejercicio === "salto_vertical" || ejercicio === "flexiones") {
    marcas.sort((a, b) => b - a); // Mayor a menor
    for (const marca of marcas) {
      if (resultado >= marca) {
        return tabla[marca];
      }
    }
  }

  // Para ejercicios donde MENOR es mejor (tiempo)
  else {
    marcas.sort((a, b) => a - b); // Menor a mayor
    for (const marca of marcas) {
      if (resultado <= marca) {
        return tabla[marca];
      }
    }
  }

  return 0;
};

/**
 * Convierte puntos a nota
 */
const puntosANota = (puntos: number): number => {
  if (puntos >= 35) return 10.0;
  if (puntos >= 30) return 9.0;
  if (puntos >= 25) return 8.0;
  if (puntos >= 20) return 7.0;
  if (puntos >= 15) return 6.0;
  if (puntos >= 10) return 5.5;
  if (puntos >= 5) return 5.0;
  return 0;
};

// ===================================================================
// SERVICIO CALCULADORA AGBS
// ===================================================================

export class CalculadoraAGBS {
  /**
   * Califica un ejercicio según las tablas AGBS
   */
  calificarEjercicio(
    ejercicio: TipoEjercicio,
    resultado: number,
    sexo: Sexo,
    grado: Grado
  ): ResultadoEjercicio {
    try {
      const ejercicioData = TABLA_MARCAS[ejercicio];
      const marcaMinima = ejercicioData.marcas[sexo]?.[grado];

      if (!marcaMinima) {
        return {
          ejercicio: ejercicioData.descripcion,
          resultado,
          marcaMinima: 0,
          unidad: ejercicioData.unidad,
          calificacion: "NO APTO",
          esApto: false,
          diferencia: 0,
          mensaje: "❌ Configuración no encontrada",
          fecha: new Date().toLocaleString("es-ES"),
          error: true,
        };
      }

      // Calcular puntos y nota
      const puntos = calcularPuntos(ejercicio, resultado, sexo);
      const nota = puntosANota(puntos);

      // Determinar si es APTO o NO APTO
      let esApto = false;

      if (ejercicioData.tipo === "mayor_mejor") {
        esApto = resultado >= marcaMinima;
      } else if (ejercicioData.tipo === "menor_mejor") {
        esApto = resultado <= marcaMinima;
      }

      return {
        ejercicio: ejercicioData.descripcion,
        resultado,
        marcaMinima,
        unidad: ejercicioData.unidad,
        calificacion: esApto ? "APTO" : "NO APTO",
        esApto,
        diferencia: Math.abs(resultado - marcaMinima),
        mensaje: esApto
          ? "✅ ¡Felicidades! Has superado la marca mínima"
          : "❌ No has alcanzado la marca mínima",
        fecha: new Date().toLocaleString("es-ES"),
        // NUEVOS CAMPOS
        puntos,
        nota,
        notaTexto: nota >= 5.0 ? `${nota.toFixed(1)}/10` : "Insuficiente",
      };
    } catch (error) {
      return {
        ejercicio: "Error",
        resultado,
        marcaMinima: 0,
        unidad: "",
        calificacion: "NO APTO",
        esApto: false,
        diferencia: 0,
        mensaje: "⚠️ Error en el cálculo",
        fecha: new Date().toLocaleString("es-ES"),
        error: true,
        puntos: 0,
        nota: 0,
        notaTexto: "Error",
      };
    }
  }

  // ... resto de métodos igual
  obtenerInfoEjercicio(ejercicio: TipoEjercicio, sexo: Sexo, grado: Grado) {
    const ejercicioData = TABLA_MARCAS[ejercicio];
    const marcaMinima = ejercicioData.marcas[sexo]?.[grado];

    return {
      descripcion: ejercicioData.descripcion,
      unidad: ejercicioData.unidad,
      marcaMinima,
      tipo: ejercicioData.tipo,
      instrucciones: this.obtenerInstrucciones(ejercicio),
    };
  }

  convertirTiempo(minutos: number, segundos: number): number {
    return minutos * 60 + segundos;
  }

  segundosAFormato(segundosTotales: number): string {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  }

  private obtenerInstrucciones(ejercicio: TipoEjercicio): string {
    const instrucciones: Record<TipoEjercicio, string> = {
      salto_vertical:
        "Salto vertical con pies juntos desde posición estática. Se mide la diferencia entre altura inicial y altura alcanzada.",
      flexiones:
        "Flexiones completas tocando barbilla en almohadilla de 10cm. Mantener cuerpo recto en todo momento.",
      carrera_50m:
        "Carrera de velocidad en línea recta. Salida de pie, sin tacos de salida.",
      carrera_1000m:
        "Carrera de resistencia a ritmo sostenido. Controlar el ritmo y reservar energía.",
      natacion_50m:
        "Natación estilo libre sin apoyo en bordes o corcheras. Viraje permitido si es necesario.",
      circuito_agilidad:
        "Circuito con conos y vallas. Movimientos rápidos y precisos sin derribar obstáculos.",
    };

    return instrucciones[ejercicio] || "Instrucciones no disponibles";
  }

  validarResultado(
    ejercicio: TipoEjercicio,
    resultado: number
  ): { valido: boolean; mensaje: string } {
    if (resultado <= 0) {
      return { valido: false, mensaje: "El resultado debe ser mayor a 0" };
    }

    switch (ejercicio) {
      case "salto_vertical":
        if (resultado > 100) {
          return {
            valido: false,
            mensaje: "Salto vertical muy alto (máximo esperado: 100cm)",
          };
        }
        break;
      case "flexiones":
        if (resultado > 200) {
          return {
            valido: false,
            mensaje: "Número de flexiones muy alto (máximo esperado: 200)",
          };
        }
        break;
      case "carrera_50m":
        if (resultado > 30) {
          return {
            valido: false,
            mensaje: "Tiempo muy lento para 50m (máximo esperado: 30 segundos)",
          };
        }
        break;
      case "carrera_1000m":
        if (resultado > 900) {
          return {
            valido: false,
            mensaje:
              "Tiempo muy lento para 1000m (máximo esperado: 15 minutos)",
          };
        }
        break;
      case "natacion_50m":
        if (resultado > 300) {
          return {
            valido: false,
            mensaje:
              "Tiempo muy lento para natación 50m (máximo esperado: 5 minutos)",
          };
        }
        break;
      case "circuito_agilidad":
        if (resultado > 60) {
          return {
            valido: false,
            mensaje:
              "Tiempo muy lento para circuito (máximo esperado: 60 segundos)",
          };
        }
        break;
    }

    return { valido: true, mensaje: "Resultado válido" };
  }
}

export const calculadora = new CalculadoraAGBS();
export default calculadora;
