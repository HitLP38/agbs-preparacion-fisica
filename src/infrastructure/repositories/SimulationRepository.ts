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

  // ✅ Eliminar por IDs
  async deleteMany(userId: string, ids: string[]): Promise<void> {
    const existing = await this.getAllByUser(userId);
    const filtered = existing.filter((r) => !ids.includes(r.id));
    this.saveAllForUser(userId, filtered);
  }

  // ✅ Eliminar por rango de fechas
  async deleteByDateRange(userId: string, from: Date, to: Date): Promise<void> {
    const existing = await this.getAllByUser(userId);
    const filtered = existing.filter((r) => {
      const date = new Date(r.date);
      return date < from || date > to;
    });
    this.saveAllForUser(userId, filtered);
  }
  async setAllByUser(
    userId: string,
    records: SimulationRecord[]
  ): Promise<void> {
    const data = localStorage.getItem(STORAGE_KEY);
    let all: SimulationRecord[] = data ? JSON.parse(data) : [];

    // Filtrar registros de otros usuarios
    all = all.filter((r) => r.userId !== userId);

    // Agregar los nuevos registros
    const actualizados = [...all, ...records];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
  }

  // ✅ Método auxiliar para sobrescribir todo el historial del usuario
  private saveAllForUser(userId: string, records: SimulationRecord[]): void {
    const data = localStorage.getItem(STORAGE_KEY);
    const all: SimulationRecord[] = data ? JSON.parse(data) : [];

    // Eliminar los registros previos del usuario
    const others = all.filter((r) => r.userId !== userId);

    // Agregar los nuevos registros actualizados
    const updated = [...others, ...records];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  // Obtener todas las simulaciones, sin filtrar por usuario
  async getAll(): Promise<SimulationRecord[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  }
}
