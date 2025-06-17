import React, { useState } from 'react';
import { Button } from '@shared/components/atoms/Button';
import { ExerciseType, Gender, Grade } from '@domain/entities/Exercise';
import { CalculateSimulationUseCase } from '@domain/usecases/CalculateSimulation';
import { SimulationData } from '@domain/entities/Simulation';
import './App.css';

function App() {
  const [selectedGender, setSelectedGender] = useState<Gender>(Gender.MALE);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(Grade.FIRST);
  const [simulation, setSimulation] = useState<SimulationData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Datos de ejemplo para demostración
  const [exerciseValues, setExerciseValues] = useState({
    [ExerciseType.SALTO_VERTICAL]: 45,
    [ExerciseType.EXTENSIONES_BRAZOS]: 25,
    [ExerciseType.CARRERA_50M]: 8.5,
    [ExerciseType.CARRERA_1000M]: 240, // en segundos (4:00)
    [ExerciseType.NATACION_50M]: 45,
    [ExerciseType.CARRERA_6KM]: 1500, // en segundos (25:00)
  });

  const handleSimulation = () => {
    setIsSimulating(true);

    // Simular delay de cálculo
    setTimeout(() => {
      try {
        const exercises = Object.entries(exerciseValues).map(
          ([type, value]) => ({
            type: type as ExerciseType,
            value: value,
          })
        );

        const result = CalculateSimulationUseCase.execute(
          exercises,
          selectedGender,
          selectedGrade
        );

        setSimulation(result);
      } catch (error) {
        console.error('Error en simulación:', error);
        // Por ahora mostrar datos mock ya que no tenemos baremos implementados
        setSimulation({
          id: 'demo-' + Date.now(),
          timestamp: new Date(),
          gender: selectedGender,
          grade: selectedGrade,
          results: Object.entries(exerciseValues).map(([type, value]) => ({
            exerciseType: type as ExerciseType,
            gender: selectedGender,
            grade: selectedGrade,
            value: value,
            points: Math.floor(Math.random() * 20) + 20, // Mock: 20-40 puntos
            isApto: true,
            note: Math.random() * 2 + 7, // Mock: 7-9 nota
          })),
          totalPoints: 180,
          averageNote: 8.2,
          isGlobalApto: true,
        });
      }

      setIsSimulating(false);
    }, 1000);
  };

  const handleReset = () => {
    setSimulation(null);
  };

  const updateExerciseValue = (exerciseType: ExerciseType, value: number) => {
    setExerciseValues((prev) => ({
      ...prev,
      [exerciseType]: value,
    }));
  };

  const getExerciseLabel = (type: ExerciseType): string => {
    const labels = {
      [ExerciseType.SALTO_VERTICAL]: 'Salto Vertical (cm)',
      [ExerciseType.EXTENSIONES_BRAZOS]: 'Extensiones de Brazos (rep)',
      [ExerciseType.CARRERA_50M]: 'Carrera 50m (seg)',
      [ExerciseType.CARRERA_1000M]: 'Carrera 1000m (seg)',
      [ExerciseType.NATACION_50M]: 'Natación 50m (seg)',
      [ExerciseType.CARRERA_6KM]: 'Carrera 6km (seg)',
    };
    return labels[type];
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎖️ AGBS - Preparación Física</h1>
        <p>Academia General Básica de Suboficiales</p>
        <p>Sistema de Simulación de Pruebas Físicas</p>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Configuración de Simulación */}
          <section className="simulation-config">
            <h2>⚙️ Configuración de Simulación</h2>

            <div className="config-row">
              <div className="config-field">
                <label>Sexo:</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value as Gender)}
                  className="select-field"
                >
                  <option value={Gender.MALE}>Masculino</option>
                  <option value={Gender.FEMALE}>Femenino</option>
                </select>
              </div>

              <div className="config-field">
                <label>Grado:</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value as Grade)}
                  className="select-field"
                >
                  <option value={Grade.FIRST}>1º EMIEOF</option>
                  <option value={Grade.SECOND}>2º EMIEOF</option>
                  <option value={Grade.THIRD}>3º EMIEOF</option>
                </select>
              </div>
            </div>
          </section>

          {/* Formulario de Ejercicios */}
          <section className="exercises-section">
            <h2>🏃‍♂️ Introduce tus Marcas</h2>

            <div className="exercises-grid">
              {Object.entries(exerciseValues).map(([type, value]) => (
                <div key={type} className="exercise-field">
                  <label>{getExerciseLabel(type as ExerciseType)}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      updateExerciseValue(
                        type as ExerciseType,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="number-input"
                    step="0.1"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Botones de Acción */}
          <section className="actions-section">
            <div className="actions-row">
              <Button
                variant="primary"
                size="lg"
                loading={isSimulating}
                onClick={handleSimulation}
                disabled={isSimulating}
              >
                {isSimulating ? 'Calculando...' : '🚀 Simular Prueba'}
              </Button>

              {simulation && (
                <Button variant="secondary" size="lg" onClick={handleReset}>
                  🔄 Nueva Simulación
                </Button>
              )}
            </div>
          </section>

          {/* Resultados */}
          {simulation && (
            <section className="results-section">
              <h2>📊 Resultados de la Simulación</h2>

              <div className="results-summary">
                <div
                  className={`global-result ${simulation.isGlobalApto ? 'apto' : 'no-apto'}`}
                >
                  <h3>{simulation.isGlobalApto ? '✅ APTO' : '❌ NO APTO'}</h3>
                  <p>
                    Puntos Totales: <strong>{simulation.totalPoints}</strong>
                  </p>
                  <p>
                    Nota Media:{' '}
                    <strong>{simulation.averageNote.toFixed(2)}</strong>
                  </p>
                </div>
              </div>

              <div className="results-details">
                <h4>📋 Detalle por Ejercicio</h4>
                {simulation.results.map((result, index) => (
                  <div key={index} className="exercise-result">
                    <div className="exercise-name">
                      {getExerciseLabel(result.exerciseType)}
                    </div>
                    <div className="exercise-values">
                      <span>Marca: {result.value}</span>
                      <span>Puntos: {result.points}</span>
                      <span>Nota: {result.note.toFixed(2)}</span>
                      <span className={result.isApto ? 'apto' : 'no-apto'}>
                        {result.isApto ? 'APTO' : 'NO APTO'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          📚 Trabajo de Fin de Ciclo - Administración de Sistemas Informáticos
          en Red
        </p>
        <p>🏫 Academia Logística de Calatayud - Promoción LI</p>
        <p>👨‍💻 Desarrollado por: Diego Borrallo Lorenzo - 2025</p>
      </footer>
    </div>
  );
}

export default App;
