// src/infrastructure/repositories/SimulationRepository.ts

import { ISimulationRepository } from './types';
import { SimulationRecord } from '@/domain/entities/SimulationRecord';

const STORAGE_KEY = 'simulations';

export class LocalSimulationRepository implements ISimulationRepository {
  async save(record: SimulationRecord): Promise<void> {
    const existing = await this.getAllByUser(record.userId);
    const updated = [...existing, record];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  async getAllByUser(userId: string): Promise<SimulationRecord[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const all: SimulationRecord[] = JSON.parse(data);
    return all.filter((r) => r.userId === userId);
  }
}
