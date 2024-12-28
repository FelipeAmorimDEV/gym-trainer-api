import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'

interface DeleteExerciseUseCaseRequest {
  exerciseId: string
}

interface DeleteExerciseUseCaseResponse {
  exercise: Exercise
}

export class DeleteExerciseUseCase {
  constructor(private exercisesRepository: ExercisesRepository) {}

  async execute({
    exerciseId,
  }: DeleteExerciseUseCaseRequest): Promise<DeleteExerciseUseCaseResponse> {
    const exercise = await this.exercisesRepository.findById(exerciseId)

    if (!exercise) {
      throw new Error('Exercise not found.')
    }

    await this.exercisesRepository.delete(exercise)

    return { exercise }
  }
}
