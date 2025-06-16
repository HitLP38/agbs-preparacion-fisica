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

      {/* RESULTADO */}
      {calificacion && (
        <div
          style={{
            ...styles.resultSection,
            backgroundColor: calificacion.esApto ? "#d4edda" : "#f8d7da",
            borderColor: calificacion.esApto ? "#c3e6cb" : "#f5c6cb",
          }}
        >
          <h2 style={styles.resultTitle}>📊 Resultado</h2>
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
          <div
            style={{
              ...styles.calificacionFinal,
              color: calificacion.esApto ? "#155724" : "#721c24",
            }}
          >
            <strong>CALIFICACIÓN: {calificacion.calificacion}</strong>
          </div>
          <div style={styles.mensaje}>{calificacion.mensaje}</div>
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

// Estilos
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center" as const,
    color: "#2c3e50",
    marginBottom: "30px",
  },
  formSection: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    color: "#34495e",
    marginBottom: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold" as const,
    color: "#555",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  timeInputGroup: {
    marginBottom: "15px",
  },
  timeInputs: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  timeInput: {
    width: "80px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    textAlign: "center" as const,
  },
  timeSeparator: {
    fontSize: "20px",
    fontWeight: "bold" as const,
  },
  infoSection: {
    backgroundColor: "#e8f4f8",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #bee5eb",
  },
  infoTitle: {
    color: "#0c5460",
    marginBottom: "10px",
  },
  marcaMinima: {
    color: "#007bff",
    fontWeight: "bold" as const,
    fontSize: "18px",
  },
  calculateButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  resultSection: {
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid",
  },
  resultTitle: {
    marginBottom: "15px",
    color: "#2c3e50",
  },
  resultItem: {
    marginBottom: "10px",
    fontSize: "16px",
  },
  calificacionFinal: {
    fontSize: "24px",
    textAlign: "center" as const,
    margin: "20px 0",
    padding: "10px",
    border: "2px solid currentColor",
    borderRadius: "8px",
  },
  mensaje: {
    fontSize: "16px",
    textAlign: "center" as const,
    marginBottom: "10px",
  },
  newTestButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
};

export default SimuladorPrueba;
