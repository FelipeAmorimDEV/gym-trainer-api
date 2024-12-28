import { Exercise } from '../../enterprise/entities/exercise'

export interface ExercisesRepository {
  findById(exerciseId: string): Promise<Exercise | null>
  create(exercise: Exercise): Promise<void>
  save(exercise: Exercise): Promise<void>
  delete(exercise: Exercise): Promise<void>
}
