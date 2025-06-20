// src/views/History/HistoryView.tsx

import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Select,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
} from '@mui/material';

import { SimulationRecord } from '@/domain/entities/SimulationRecord';
import { LocalSimulationRepository } from '@/infrastructure/repositories/SimulationRepository';
import { useUser } from '@clerk/clerk-react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { ExerciseType } from '@/domain/entities/Exercise';

const ITEMS_PER_PAGE = 6;

export const HistoryView: React.FC = () => {
  const { user } = useUser();
  const [records, setRecords] = useState<SimulationRecord[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtros
  const [exerciseFilter, setExerciseFilter] = useState<ExerciseType | 'all'>(
    'all'
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);

  // 🔁 Cargar datos del usuario actual
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const repo = new LocalSimulationRepository();
      const all = await repo.getAllByUser(user.id);
      setRecords(all);
    };
    fetchData();
  }, [user]);

  // ✅ Aplicar filtros
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchExercise =
        exerciseFilter === 'all' ||
        r.results.some((res) => res.type === exerciseFilter);

      const simDate = dayjs(r.date);
      const matchStart = startDate
        ? simDate.isAfter(startDate.subtract(1, 'day'))
        : true;
      const matchEnd = endDate ? simDate.isBefore(endDate.add(1, 'day')) : true;

      return matchExercise && matchStart && matchEnd;
    });
  }, [records, exerciseFilter, startDate, endDate]);

  // 📦 Datos paginados
  const paginatedRecords = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setExerciseFilter('all');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Historial de Simulaciones
      </Typography>

      {/* 🎯 Filtros */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 3,
        }}
      >
        {/* Filtro por tipo de ejercicio */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Tipo de ejercicio</InputLabel>
          <Select
            value={exerciseFilter}
            onChange={(e) =>
              setExerciseFilter(e.target.value as ExerciseType | 'all')
            }
            label="Tipo de ejercicio"
          >
            <MenuItem value="all">Todos</MenuItem>
            {Object.values(ExerciseType).map((type) => (
              <MenuItem key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rango de fechas */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Desde"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
          />
          <DatePicker
            label="Hasta"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
          />
        </LocalizationProvider>

        <Button onClick={handleClearFilters} variant="text">
          Limpiar filtros
        </Button>
      </Box>

      {/* 🧾 Resultados */}
      {paginatedRecords.length === 0 ? (
        <Typography color="text.secondary">
          No se encontraron simulaciones.
        </Typography>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap={2}
        >
          {paginatedRecords.map((sim) => (
            <Card key={sim.id}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedIds.includes(sim.id)}
                        onChange={() => toggleSelection(sim.id)}
                      />
                    }
                    label={`Simulación: ${new Date(
                      sim.date
                    ).toLocaleDateString()}`}
                  />
                </Box>

                <Divider sx={{ my: 1 }} />

                {sim.results.map((r) => (
                  <Box key={r.type} mb={1}>
                    <Typography variant="body2">
                      <strong>{r.type}</strong>: {r.marca} - {r.puntos} pts /
                      Nota {r.nota}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  Promedio final: <strong>{sim.finalScore.toFixed(2)}</strong>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* 📚 Paginación */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
