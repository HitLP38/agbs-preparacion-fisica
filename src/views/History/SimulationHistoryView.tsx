import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import { SimulationRecord } from '@/domain/entities/SimulationRecord';
import { LocalSimulationRepository } from '@/infrastructure/repositories/SimulationRepository';
import { EXERCISE_DEFINITIONS } from '@/domain/entities/Exercise';

// Vista de historial de simulaciones
export const SimulationHistoryView: React.FC = () => {
  const [records, setRecords] = useState<SimulationRecord[]>([]);

  // Cargar simulaciones al montar el componente
  useEffect(() => {
    const fetchSimulations = async () => {
      const repo = new LocalSimulationRepository();
      const sims = await repo.getAll(); // aquí usamos await
      setRecords(sims);
    };

    fetchSimulations();
  }, []);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Historial de Simulaciones
      </Typography>

      {records.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No hay simulaciones guardadas.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {records.map((record) => (
            <Card key={record.id}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Fecha: {new Date(record.date).toLocaleString()}
                </Typography>
                <Typography variant="body1" fontWeight={600} mb={1}>
                  Nota Final: {record.finalScore.toFixed(2)}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" flexWrap="wrap" gap={1}>
                  {record.results.map((res) => (
                    <Chip
                      key={res.type}
                      label={`${EXERCISE_DEFINITIONS[res.type].description}: ${res.marca} → Nota: ${res.nota}`}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};
