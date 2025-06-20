// src/views/History/HistoryView.tsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from '@mui/material';

import { LocalSimulationRepository } from '@/infrastructure/repositories/SimulationRepository';
import { SimulationRecord } from '@/domain/entities/SimulationRecord';
import { User } from '@/domain/entities/User';

interface Props {
  user: User;
}

export const HistoryView: React.FC<Props> = ({ user }) => {
  const [simulations, setSimulations] = useState<SimulationRecord[] | null>(
    null
  );

  // Cargar simulaciones al iniciar
  useEffect(() => {
    const fetchData = async () => {
      const repo = new LocalSimulationRepository();
      const data = await repo.getAllByUser(user.id);
      setSimulations(data);
    };
    fetchData();
  }, [user.id]);

  if (!simulations) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (simulations.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="body1">
          No hay simulaciones guardadas aún.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Historial de Simulaciones
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {simulations.map((sim) => (
          <Card key={sim.id} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {new Date(sim.date).toLocaleString()}
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Nota Final: {sim.finalScore.toFixed(2)}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary">
                Ejercicios realizados: {sim.results.length}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
