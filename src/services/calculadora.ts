import type {
  TipoEjercicio,
  Sexo,
  Grado,
  ResultadoEjercicio,
  ParametrosUsuario,
} from "../types/agbs";
import { TABLA_MARCAS } from "../utils/constants";

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

      // Determinar si es APTO o NO APTO
      let esApto = false;

      if (ejercicioData.tipo === "mayor_mejor") {
        // Para salto y flexiones: mayor número = mejor
        esApto = resultado >= marcaMinima;
      } else if (ejercicioData.tipo === "menor_mejor") {
        // Para carreras y natación: menor tiempo = mejor
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
      };
    }
  }

  /**
   * Obtiene información de un ejercicio para mostrar antes de realizarlo
   */
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

  /**
   * Convierte tiempo MM:SS a segundos totales
   */
  convertirTiempo(minutos: number, segundos: number): number {
    return minutos * 60 + segundos;
  }

  /**
   * Convierte segundos a formato MM:SS
   */
  segundosAFormato(segundosTotales: number): string {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  }

  /**
   * Obtiene instrucciones específicas para cada ejercicio
   */
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

  /**
   * Valida si un resultado es válido para el tipo de ejercicio
   */
  validarResultado(
    ejercicio: TipoEjercicio,
    resultado: number
  ): { valido: boolean; mensaje: string } {
    if (resultado <= 0) {
      return { valido: false, mensaje: "El resultado debe ser mayor a 0" };
    }

    // Validaciones específicas por ejercicio
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
          // 15 minutos
          return {
            valido: false,
            mensaje:
              "Tiempo muy lento para 1000m (máximo esperado: 15 minutos)",
          };
        }
        break;

      case "natacion_50m":
        if (resultado > 300) {
          // 5 minutos
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

// Exportar instancia única
export const calculadora = new CalculadoraAGBS();
export default calculadora;
