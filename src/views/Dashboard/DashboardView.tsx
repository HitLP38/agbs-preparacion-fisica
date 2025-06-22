import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from '@mui/material';

import { Grid } from '@mui/material';

import { useUser } from '@clerk/clerk-react';
import { LocalSimulationRepository } from '@/infrastructure/repositories/SimulationRepository';
import { SimulationRecord } from '@/domain/entities/SimulationRecord';
import { EXERCISE_DEFINITIONS, ExerciseType } from '@/domain/entities/Exercise';

export const DashboardView: React.FC = () => {
  const { user } = useUser();
  const [simulations, setSimulations] = useState<SimulationRecord[] | null>(
    null
  );

  // Cargar las simulaciones al iniciar
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const repo = new LocalSimulationRepository();
      const records = await repo.getAllByUser(user.id);
      setSimulations(records);
    };
    fetchData();
  }, [user]);

  // Mostrar spinner mientras carga
  if (simulations === null) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Sin simulaciones aún
  if (simulations.length === 0) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={600}>
          Bienvenido al Dashboard
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Aún no has realizado simulaciones. Haz una desde la sección
          "Ejercicios".
        </Typography>
      </Box>
    );
  }

  // ▶️ Cálculos
  const totalSimulaciones = simulations.length;
  const promedioNotas =
    simulations.reduce((acc, s) => acc + s.finalScore, 0) / totalSimulaciones;

  const ultimaFecha = new Date(
    Math.max(...simulations.map((s) => new Date(s.date).getTime()))
  ).toLocaleDateString();

  const allResults = simulations.flatMap((s) => s.results);
  const totalEjercicios = allResults.length;
  const notaGlobalPromedio =
    totalEjercicios > 0
      ? allResults.reduce((acc, r) => acc + r.nota, 0) / totalEjercicios
      : 0;

  const ejerciciosAprobados = allResults.filter((r) => r.nota >= 5).length;
  const porcentajeApto = totalEjercicios
    ? Math.round((ejerciciosAprobados / totalEjercicios) * 100)
    : 0;

  // ▶️ Mejor ejercicio
  const sumatorias: Record<string, { total: number; count: number }> = {};
  allResults.forEach((r) => {
    if (!sumatorias[r.type]) {
      sumatorias[r.type] = { total: 0, count: 0 };
    }
    sumatorias[r.type].total += r.nota;
    sumatorias[r.type].count += 1;
  });

  const ejercicioConMejorNota = Object.entries(sumatorias)
    .map(([type, { total, count }]) => ({
      type,
      promedio: total / count,
    }))
    .reduce((max, curr) => (curr.promedio > max.promedio ? curr : max));

  // ▶️ Peor rendimiento
  const promediosPorEjercicio: Record<ExerciseType, number[]> = {} as any;
  simulations.forEach((sim) => {
    sim.results.forEach((r) => {
      if (!promediosPorEjercicio[r.type]) {
        promediosPorEjercicio[r.type] = [];
      }
      promediosPorEjercicio[r.type].push(r.nota);
    });
  });

  const peorRendimiento = Object.entries(promediosPorEjercicio)
    .map(([type, notas]) => ({
      type: type as ExerciseType,
      promedio: notas.reduce((a, b) => a + b, 0) / notas.length,
    }))
    .sort((a, b) => a.promedio - b.promedio)
    .slice(0, 3);

  // ▶️ Datos para el gráfico
  const chartData = simulations
    .map((sim) => ({
      date: new Date(sim.date).toLocaleDateString('es-PE'),
      nota: Number(sim.finalScore.toFixed(2)),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Tu Resumen de Rendimiento
      </Typography>

      {/* Resumen principal */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        mb={3}
      >
        <Card sx={{ minWidth: 250, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Total de Simulaciones
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {totalSimulaciones}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 250, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Nota Promedio
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary">
              {promedioNotas.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 250, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Última Simulación
            </Typography>
            <Typography variant="h6">{ultimaFecha}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Resumen global de ejercicios */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }} component="div">
          <Card
            sx={{ textAlign: 'center', py: 2, borderRadius: 3, boxShadow: 2 }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Nota Promedio Global
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary">
              {notaGlobalPromedio.toFixed(2)}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} component="div">
          <Card
            sx={{ textAlign: 'center', py: 2, borderRadius: 3, boxShadow: 2 }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Ejercicios Evaluados
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {totalEjercicios}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }} component="div">
          <Card
            sx={{ textAlign: 'center', py: 2, borderRadius: 3, boxShadow: 2 }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              % APTOS
            </Typography>
            <Typography variant="h4" fontWeight={700} color="success.main">
              {porcentajeApto}%
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Mejor ejercicio */}
      <Card sx={{ borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Mejor Ejercicio Promedio
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            {ejercicioConMejorNota.type.replace(/_/g, ' ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nota promedio: {ejercicioConMejorNota.promedio.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />
      {/* Peor rendimiento */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Ejercicios con Menor Rendimiento Promedio
      </Typography>
      <Box
        sx={{
          maxWidth: '100%',
          width: { xs: '100%', sm: 500 },
          mx: 'auto',
          border: '1px solid #ccc',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Box display="flex" bgcolor="#E9EEED" px={2} py={1}>
          <Typography sx={{ flex: 1, fontWeight: 600 }}>Ejercicio</Typography>
          <Typography sx={{ fontWeight: 600 }}>Nota Promedio</Typography>
        </Box>

        {peorRendimiento.map((item) => (
          <Box
            key={item.type}
            display="flex"
            px={2}
            py={1}
            borderTop="1px solid #ccc"
          >
            <Typography sx={{ flex: 1 }}>
              {EXERCISE_DEFINITIONS[item.type].description}
            </Typography>
            <Typography>{item.promedio.toFixed(2)}</Typography>
          </Box>
        ))}
      </Box>

      {/* Gráfico */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Evolución de Nota Promedio
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="nota"
              stroke="#2E3E50"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
