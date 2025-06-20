// src/infrastructure/repositories/types.ts

import { SimulationRecord } from '@/domain/entities/SimulationRecord';

export interface ISimulationRepository {
  save(record: SimulationRecord): Promise<void>;
  getAllByUser(userId: string): Promise<SimulationRecord[]>;
}
