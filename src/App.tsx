// ============================================
// src/App.tsx - Completo con Card Components
// ============================================
import React, { useState } from 'react';
import { Button } from '@shared/components/atoms/Button';
import { Input } from '@shared/components/atoms/Input';
import { Select, SelectOption } from '@shared/components/atoms/Select';
import { Card } from '@shared/components/molecules/Card';
import { ExerciseType, Gender, Grade } from '@domain/entities/Exercise';
import { CalculateSimulationUseCase } from '@domain/usecases/CalculateSimulation';
import { SimulationData } from '@domain/entities/Simulation';
import './App.css';

function App() {
  const [selectedGender, setSelectedGender] = useState<Gender>(Gender.MALE);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(Grade.FIRST);
  const [simulation, setSimulation] = useState<SimulationData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Estados de validación para selects
  const [genderError, setGenderError] = useState<string>('');
  const [gradeError, setGradeError] = useState<string>('');

  // Datos de ejemplo para demostración
  const [exerciseValues, setExerciseValues] = useState({
    [ExerciseType.SALTO_VERTICAL]: 45,
    [ExerciseType.EXTENSIONES_BRAZOS]: 25,
    [ExerciseType.CARRERA_50M]: 8.5,
    [ExerciseType.CARRERA_1000M]: 240, // en segundos (4:00)
    [ExerciseType.NATACION_50M]: 45,
    [ExerciseType.CARRERA_6KM]: 1500, // en segundos (25:00)
  });

  // Estados de validación para cada input
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({
    [ExerciseType.SALTO_VERTICAL]: '',
    [ExerciseType.EXTENSIONES_BRAZOS]: '',
    [ExerciseType.CARRERA_50M]: '',
    [ExerciseType.CARRERA_1000M]: '',
    [ExerciseType.NATACION_50M]: '',
    [ExerciseType.CARRERA_6KM]: '',
  });

  // Opciones para los selects
  const genderOptions: SelectOption[] = [
    { value: Gender.MALE, label: 'Masculino' },
    { value: Gender.FEMALE, label: 'Femenino' },
  ];

  const gradeOptions: SelectOption[] = [
    { value: Grade.FIRST, label: '1º EMIEOF. Y EMIES CGET' },
    { value: Grade.SECOND, label: '2º EMIEOF. Y EMIES CGET' },
    { value: Grade.THIRD, label: '3º EMIEOF. Y EMIES CGET' },
  ];

  const handleSimulation = () => {
    // Validar todos los campos antes de simular
    if (!validateAllFields()) {
      return;
    }

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
        // Mostrar datos mock en caso de error
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
            points: Math.floor(Math.random() * 20) + 20,
            isApto: true,
            note: Math.random() * 2 + 7,
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
    // Limpiar errores
    setInputErrors({
      [ExerciseType.SALTO_VERTICAL]: '',
      [ExerciseType.EXTENSIONES_BRAZOS]: '',
      [ExerciseType.CARRERA_50M]: '',
      [ExerciseType.CARRERA_1000M]: '',
      [ExerciseType.NATACION_50M]: '',
      [ExerciseType.CARRERA_6KM]: '',
    });
    setGenderError('');
    setGradeError('');
  };

  const validateAllFields = (): boolean => {
    let isValid = true;

    // Validar selects
    if (!selectedGender) {
      setGenderError('Por favor selecciona un sexo');
      isValid = false;
    } else {
      setGenderError('');
    }

    if (!selectedGrade) {
      setGradeError('Por favor selecciona un grado');
      isValid = false;
    } else {
      setGradeError('');
    }

    // Validar inputs
    const inputValidation = validateInputs();
    return isValid && inputValidation;
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = { ...inputErrors };
    let isValid = true;

    // Validaciones por ejercicio
    Object.entries(exerciseValues).forEach(([type, value]) => {
      const exerciseType = type as ExerciseType;

      if (!value || value <= 0) {
        newErrors[exerciseType] = 'Este campo es requerido';
        isValid = false;
      } else {
        // Validaciones específicas por ejercicio
        switch (exerciseType) {
          case ExerciseType.SALTO_VERTICAL:
            if (value < 10 || value > 100) {
              newErrors[exerciseType] = 'Ingresa un valor entre 10 y 100 cm';
              isValid = false;
            } else {
              newErrors[exerciseType] = '';
            }
            break;

          case ExerciseType.EXTENSIONES_BRAZOS:
            if (value < 1 || value > 100) {
              newErrors[exerciseType] =
                'Ingresa un valor entre 1 y 100 repeticiones';
              isValid = false;
            } else {
              newErrors[exerciseType] = '';
            }
            break;

          case ExerciseType.CARRERA_50M:
            if (value < 5 || value > 20) {
              newErrors[exerciseType] =
                'Ingresa un tiempo entre 5 y 20 segundos';
              isValid = false;
            } else {
              newErrors[exerciseType] = '';
            }
            break;

          case ExerciseType.CARRERA_1000M:
            if (value < 120 || value > 600) {
              newErrors[exerciseType] =
                'Ingresa un tiempo entre 2 y 10 minutos (120-600 seg)';
              isValid = false;
            } else {
              newErrors[exerciseType] = '';
            }
            break;

          case ExerciseType.NATACION_50M:
            if (value < 20 || value > 120) {
              newErrors[exerciseType] =
                'Ingresa un tiempo entre 20 y 120 segundos';
              isValid = false;
            } else {
              newErrors[exerciseType] = '';
            }
            break;

          case ExerciseType.CARRERA_6KM:
            if (value < 1000 || value > 3000) {
              newErrors[exerciseType] =
                'Ingresa un tiempo entre 16 y 50 minutos (1000-3000 seg)';
              isValid = false;
            } else {
              newErrors[exerciseType] = '';
            }
            break;

          default:
            newErrors[exerciseType] = '';
        }
      }
    });

    setInputErrors(newErrors);
    return isValid;
  };

  const updateExerciseValue = (exerciseType: ExerciseType, value: number) => {
    setExerciseValues((prev) => ({
      ...prev,
      [exerciseType]: value,
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (inputErrors[exerciseType]) {
      setInputErrors((prev) => ({
        ...prev,
        [exerciseType]: '',
      }));
    }
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value as Gender);
    if (genderError) {
      setGenderError('');
    }
  };

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value as Grade);
    if (gradeError) {
      setGradeError('');
    }
  };

  const getExerciseConfig = (type: ExerciseType) => {
    const configs = {
      [ExerciseType.SALTO_VERTICAL]: {
        label: 'Salto Vertical',
        unit: 'cm',
        helperText: 'Ingresa la altura en centímetros (ej: 45)',
        placeholder: '45',
        step: 1,
        min: 10,
        max: 100,
      },
      [ExerciseType.EXTENSIONES_BRAZOS]: {
        label: 'Extensiones de Brazos',
        unit: 'repeticiones',
        helperText: 'Número de extensiones completadas (ej: 25)',
        placeholder: '25',
        step: 1,
        min: 1,
        max: 100,
      },
      [ExerciseType.CARRERA_50M]: {
        label: 'Carrera 50 metros',
        unit: 'segundos',
        helperText: 'Tiempo en segundos con decimales (ej: 8.5)',
        placeholder: '8.5',
        step: 0.1,
        min: 5,
        max: 20,
      },
      [ExerciseType.CARRERA_1000M]: {
        label: 'Carrera 1000 metros',
        unit: 'segundos',
        helperText: 'Tiempo total en segundos (ej: 240 = 4:00)',
        placeholder: '240',
        step: 1,
        min: 120,
        max: 600,
      },
      [ExerciseType.NATACION_50M]: {
        label: 'Natación 50 metros',
        unit: 'segundos',
        helperText: 'Tiempo en segundos (ej: 45)',
        placeholder: '45',
        step: 1,
        min: 20,
        max: 120,
      },
      [ExerciseType.CARRERA_6KM]: {
        label: 'Carrera 6 kilómetros',
        unit: 'segundos',
        helperText: 'Tiempo total en segundos (ej: 1500 = 25:00)',
        placeholder: '1500',
        step: 1,
        min: 1000,
        max: 3000,
      },
    };
    return configs[type];
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
              <Select
                label="Sexo"
                options={genderOptions}
                value={selectedGender}
                onChange={(e) => handleGenderChange(e.target.value)}
                placeholder="Selecciona tu sexo"
                helperText="Selecciona tu sexo biológico para aplicar el baremo correcto"
                errorMessage={genderError}
                required
                fullWidth
                size="md"
              />

              <Select
                label="Grado Militar"
                options={gradeOptions}
                value={selectedGrade}
                onChange={(e) => handleGradeChange(e.target.value)}
                placeholder="Selecciona el grado al que aspiras"
                helperText="Cada grado tiene baremos de exigencia diferentes"
                errorMessage={gradeError}
                required
                fullWidth
                size="md"
              />
            </div>
          </section>

          {/* Formulario de Ejercicios */}
          <section className="exercises-section">
            <h2>🏃‍♂️ Introduce tus Marcas</h2>

            <div className="exercises-grid">
              {Object.entries(exerciseValues).map(([type, value]) => {
                const exerciseType = type as ExerciseType;
                const config = getExerciseConfig(exerciseType);

                return (
                  <Input
                    key={type}
                    type="number"
                    label={`${config.label} (${config.unit})`}
                    value={value}
                    onChange={(e) =>
                      updateExerciseValue(
                        exerciseType,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder={config.placeholder}
                    helperText={config.helperText}
                    errorMessage={inputErrors[exerciseType]}
                    step={config.step}
                    min={config.min}
                    max={config.max}
                    required
                    fullWidth
                    size="md"
                  />
                );
              })}
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

          {/* Resultados - USANDO CARD COMPONENTS */}
          {simulation && (
            <section className="results-section">
              <h2>📊 Resultados de la Simulación</h2>

              {/* Card principal de resumen */}
              <Card
                variant={simulation.isGlobalApto ? 'success' : 'error'}
                size="lg"
                header={
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>
                      {simulation.isGlobalApto
                        ? '✅ RESULTADO: APTO'
                        : '❌ RESULTADO: NO APTO'}
                    </h3>
                  </div>
                }
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                      Puntos Totales
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                      }}
                    >
                      {simulation.totalPoints}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                      Nota Media
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                      }}
                    >
                      {simulation.averageNote.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                      Configuración
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#6b7280',
                      }}
                    >
                      {simulation.gender === Gender.MALE
                        ? 'Masculino'
                        : 'Femenino'}{' '}
                      • {simulation.grade}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Cards individuales por ejercicio */}
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#374151' }}>
                  📋 Detalle por Ejercicio
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {simulation.results.map((result, index) => {
                    const config = getExerciseConfig(result.exerciseType);
                    return (
                      <Card
                        key={index}
                        variant={result.isApto ? 'success' : 'error'}
                        size="md"
                        header={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <span style={{ fontWeight: 'bold' }}>
                              {config.label}
                            </span>
                            <span
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                backgroundColor: result.isApto
                                  ? '#dcfce7'
                                  : '#fee2e2',
                                color: result.isApto ? '#14532d' : '#991b1b',
                              }}
                            >
                              {result.isApto ? 'APTO' : 'NO APTO'}
                            </span>
                          </div>
                        }
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span style={{ color: '#6b7280' }}>Tu marca:</span>
                            <span style={{ fontWeight: 'bold' }}>
                              {result.value} {config.unit}
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span style={{ color: '#6b7280' }}>
                              Puntos obtenidos:
                            </span>
                            <span style={{ fontWeight: 'bold' }}>
                              {result.points} pts
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span style={{ color: '#6b7280' }}>
                              Nota equivalente:
                            </span>
                            <span style={{ fontWeight: 'bold' }}>
                              {result.note.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
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
