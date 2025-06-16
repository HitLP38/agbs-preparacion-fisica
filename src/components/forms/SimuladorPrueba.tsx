import React, { useState, useEffect } from "react";
import { calculadora } from "../../services/calculadora";
import {
  LISTA_EJERCICIOS,
  LISTA_SEXO,
  LISTA_GRADO,
} from "../../utils/constants";
import type {
  TipoEjercicio,
  Sexo,
  Grado,
  ResultadoEjercicio,
} from "../../types/agbs";

const SimuladorPrueba: React.FC = () => {
  // Estados del formulario
  const [ejercicio, setEjercicio] = useState<TipoEjercicio | "">("");
  const [sexo, setSexo] = useState<Sexo | "">("");
  const [grado, setGrado] = useState<Grado | "">("");
  const [resultado, setResultado] = useState<string>("");
  const [minutos, setMinutos] = useState<string>("");
  const [segundos, setSegundos] = useState<string>("");

  // Estados de información
  const [infoEjercicio, setInfoEjercicio] = useState<any>(null);
  const [calificacion, setCalificacion] = useState<ResultadoEjercicio | null>(
    null
  );

  // Actualizar información cuando cambian los parámetros
  useEffect(() => {
    if (ejercicio && sexo && grado) {
      const info = calculadora.obtenerInfoEjercicio(ejercicio, sexo, grado);
      setInfoEjercicio(info);
      setCalificacion(null);
    }
  }, [ejercicio, sexo, grado]);

  // Determinar si necesita input de tiempo
  const necesitaTiempo =
    ejercicio === "carrera_1000m" || ejercicio === "natacion_50m";

  // Función para calcular resultado
  const calcularResultado = () => {
    if (!ejercicio || !sexo || !grado) {
      alert("Por favor selecciona todos los parámetros");
      return;
    }

    let resultadoFinal: number;

    if (necesitaTiempo) {
      if (!minutos || !segundos) {
        alert("Por favor ingresa minutos y segundos");
        return;
      }
      resultadoFinal = calculadora.convertirTiempo(
        Number(minutos),
        Number(segundos)
      );
    } else {
      if (!resultado) {
        alert("Por favor ingresa tu resultado");
        return;
      }
      resultadoFinal = Number(resultado);
    }

    // Validar resultado
    const validacion = calculadora.validarResultado(ejercicio, resultadoFinal);
    if (!validacion.valido) {
      alert(validacion.mensaje);
      return;
    }

    // Calcular calificación
    const calificacionObtenida = calculadora.calificarEjercicio(
      ejercicio,
      resultadoFinal,
      sexo,
      grado
    );
    setCalificacion(calificacionObtenida);
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setEjercicio("");
    setSexo("");
    setGrado("");
    setResultado("");
    setMinutos("");
    setSegundos("");
    setInfoEjercicio(null);
    setCalificacion(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏃‍♂️ Simulador Pruebas Físicas AGBS</h1>

      {/* FORMULARIO DE PARÁMETROS */}
      <div style={styles.formSection}>
        <h2 style={styles.sectionTitle}>1. Selecciona los Parámetros</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Ejercicio:</label>
          <select
            style={styles.select}
            value={ejercicio}
            onChange={(e) => setEjercicio(e.target.value as TipoEjercicio)}
          >
            <option value="">-- Selecciona un ejercicio --</option>
            {LISTA_EJERCICIOS.map((ej) => (
              <option key={ej.value} value={ej.value}>
                {ej.label}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Sexo:</label>
          <select
            style={styles.select}
            value={sexo}
            onChange={(e) => setSexo(e.target.value as Sexo)}
          >
            <option value="">-- Selecciona sexo --</option>
            {LISTA_SEXO.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Grado:</label>
          <select
            style={styles.select}
            value={grado}
            onChange={(e) => setGrado(e.target.value as Grado)}
          >
            <option value="">-- Selecciona grado --</option>
            {LISTA_GRADO.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* INFORMACIÓN DEL EJERCICIO */}
      {infoEjercicio && (
        <div style={styles.infoSection}>
          <h3 style={styles.infoTitle}>📋 Información del Ejercicio</h3>
          <p>
            <strong>Ejercicio:</strong> {infoEjercicio.descripcion}
          </p>
          <p>
            <strong>Marca mínima para APTO:</strong>
            <span style={styles.marcaMinima}>
              {" "}
              {infoEjercicio.marcaMinima} {infoEjercicio.unidad}
            </span>
          </p>
          <p>
            <strong>Instrucciones:</strong> {infoEjercicio.instrucciones}
          </p>
        </div>
      )}

      {/* FORMULARIO DE RESULTADO */}
      {infoEjercicio && (
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>2. Ingresa tu Resultado</h2>

          {!necesitaTiempo && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Tu resultado ({infoEjercicio.unidad}):
              </label>
              <input
                type="number"
                style={styles.input}
                value={resultado}
                onChange={(e) => setResultado(e.target.value)}
                placeholder={`Ej: ${infoEjercicio.marcaMinima}`}
                step="0.1"
              />
            </div>
          )}

          {necesitaTiempo && (
            <div style={styles.timeInputGroup}>
              <label style={styles.label}>Tu tiempo:</label>
              <div style={styles.timeInputs}>
                <input
                  type="number"
                  style={styles.timeInput}
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  placeholder="Min"
                  min="0"
                />
                <span style={styles.timeSeparator}>:</span>
                <input
                  type="number"
                  style={styles.timeInput}
                  value={segundos}
                  onChange={(e) => setSegundos(e.target.value)}
                  placeholder="Seg"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          )}

          <button style={styles.calculateButton} onClick={calcularResultado}>
            🧮 Calcular Resultado
          </button>
        </div>
      )}

      {/* RESULTADO COMPLETO */}
      {calificacion && (
        <div
          style={{
            ...styles.resultSection,
            backgroundColor: calificacion.esApto ? "#d4edda" : "#f8d7da",
            borderColor: calificacion.esApto ? "#c3e6cb" : "#f5c6cb",
          }}
        >
          <h2 style={styles.resultTitle}>📊 Resultado Completo</h2>

          <div style={styles.resultItem}>
            <strong>Ejercicio:</strong> {calificacion.ejercicio}
          </div>

          <div style={styles.resultItem}>
            <strong>Tu resultado:</strong> {calificacion.resultado}{" "}
            {calificacion.unidad}
          </div>

          <div style={styles.resultItem}>
            <strong>Marca mínima:</strong> {calificacion.marcaMinima}{" "}
            {calificacion.unidad}
          </div>

          {/* NUEVOS CAMPOS DE PUNTUACIÓN */}
          <div style={styles.resultItem}>
            <strong>Puntos obtenidos:</strong>{" "}
            <span style={styles.puntos}>
              {(calificacion as any).puntos || 0} puntos
            </span>
          </div>

          <div style={styles.resultItem}>
            <strong>Nota final:</strong>{" "}
            <span style={styles.nota}>
              {(calificacion as any).notaTexto || "Sin nota"}
            </span>
          </div>

          <div
            style={{
              ...styles.calificacionFinal,
              color: calificacion.esApto ? "#155724" : "#721c24",
            }}
          >
            <strong>CALIFICACIÓN: {calificacion.calificacion}</strong>
          </div>

          <div style={styles.mensaje}>{calificacion.mensaje}</div>

          <div style={styles.diferencia}>
            Diferencia: {calificacion.diferencia.toFixed(1)}{" "}
            {calificacion.unidad}
          </div>
        </div>
      )}

      {calificacion && (
        <button style={styles.newTestButton} onClick={limpiarFormulario}>
          🔄 Nueva Simulación
        </button>
      )}
    </div>
  );
};

// ===================================================================
// ESTILOS CSS-IN-JS RESPONSIVE
// ===================================================================

const styles = {
  container: {
    width: "100%",
    maxWidth: "none",
    margin: "0",
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center" as const,
    color: "#2c3e50",
    marginBottom: "30px",
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
  },
  formSection: {
    backgroundColor: "white",
    padding: "clamp(15px, 3vw, 25px)",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: "100%",
  },
  sectionTitle: {
    color: "#34495e",
    marginBottom: "15px",
    fontSize: "clamp(1rem, 3vw, 1.25rem)",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold" as const,
    color: "#555",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
  },
  select: {
    width: "100%",
    padding: "clamp(8px, 2vw, 12px)",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "clamp(14px, 3vw, 16px)",
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    padding: "clamp(8px, 2vw, 12px)",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "clamp(14px, 3vw, 16px)",
  },
  timeInputGroup: {
    marginBottom: "15px",
  },
  timeInputs: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
  },
  timeInput: {
    width: "clamp(60px, 15vw, 80px)",
    padding: "clamp(8px, 2vw, 12px)",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "clamp(14px, 3vw, 16px)",
    textAlign: "center" as const,
  },
  timeSeparator: {
    fontSize: "clamp(16px, 4vw, 20px)",
    fontWeight: "bold" as const,
  },
  infoSection: {
    backgroundColor: "#e8f4f8",
    padding: "clamp(12px, 3vw, 18px)",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #bee5eb",
  },
  infoTitle: {
    color: "#0c5460",
    marginBottom: "10px",
    fontSize: "clamp(1rem, 3vw, 1.1rem)",
  },
  marcaMinima: {
    color: "#007bff",
    fontWeight: "bold" as const,
    fontSize: "clamp(16px, 4vw, 18px)",
  },
  calculateButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "clamp(10px, 3vw, 15px) clamp(20px, 5vw, 30px)",
    border: "none",
    borderRadius: "6px",
    fontSize: "clamp(14px, 3vw, 16px)",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
  resultSection: {
    padding: "clamp(15px, 4vw, 25px)",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid",
    width: "100%",
  },
  resultTitle: {
    marginBottom: "15px",
    color: "#2c3e50",
    fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
  },
  resultItem: {
    marginBottom: "12px",
    fontSize: "clamp(14px, 3vw, 16px)",
    lineHeight: "1.4",
  },
  calificacionFinal: {
    fontSize: "clamp(18px, 5vw, 24px)",
    textAlign: "center" as const,
    margin: "20px 0",
    padding: "clamp(8px, 2vw, 12px)",
    border: "2px solid currentColor",
    borderRadius: "8px",
    fontWeight: "bold" as const,
  },
  mensaje: {
    fontSize: "clamp(14px, 3vw, 16px)",
    textAlign: "center" as const,
    marginBottom: "10px",
    fontWeight: "500" as const,
  },
  diferencia: {
    fontSize: "clamp(12px, 2.5vw, 14px)",
    color: "#666",
    textAlign: "center" as const,
    marginTop: "10px",
  },
  newTestButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "clamp(10px, 3vw, 15px) clamp(20px, 5vw, 30px)",
    border: "none",
    borderRadius: "6px",
    fontSize: "clamp(14px, 3vw, 16px)",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
  // NUEVOS ESTILOS PARA PUNTUACIÓN
  puntos: {
    color: "#007bff",
    fontWeight: "bold" as const,
    fontSize: "clamp(16px, 4vw, 18px)",
  },
  nota: {
    color: "#28a745",
    fontWeight: "bold" as const,
    fontSize: "clamp(16px, 4vw, 18px)",
  },
};

export default SimuladorPrueba;
