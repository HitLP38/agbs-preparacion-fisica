import { ExerciseType, Gender, Grade } from '../entities/Exercise';
import { ExerciseResult, SimulationData } from '../entities/Simulation';
import { BaremoService } from '../services/BaremoService';
export class CalculateSimulationUseCase {
  static execute(
    exercises: Array<{
      type: ExerciseType;
      value: number;
    }>,
    gender: Gender,
    grade: Grade
  ): SimulationData {
    const results: ExerciseResult[] = exercises.map((exercise) => {
      const points = BaremoService.calculatePoints(
        exercise.type,
        gender,
        grade,
        exercise.value
      );

      return {
        exerciseType: exercise.type,
        gender,
        grade,
        value: exercise.value,
        points,
        isApto: BaremoService.isApto(points),
        note: BaremoService.pointsToNote(points),
      };
    });

    const totalPoints = results.reduce((sum, result) => sum + result.points, 0);
    const averageNote =
      results.reduce((sum, result) => sum + result.note, 0) / results.length;
    const isGlobalApto = results.every((result) => result.isApto);

    return {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      gender,
      grade,
      results,
      totalPoints,
      averageNote: Number(averageNote.toFixed(4)),
      isGlobalApto,
    };
  }
}
