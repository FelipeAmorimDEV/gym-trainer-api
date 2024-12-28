import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'

interface CreateExerciseUseCaseRequest {
  name: string
  videoUrl: string
  description?: string
}

interface CreateExerciseUseCaseResponse {
  exercise: Exercise
}

export class CreateExerciseUseCase {
  constructor(private exercisesRepository: ExercisesRepository) {}

  async execute({
    name,
    videoUrl,
    description,
  }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
    const exercise = Exercise.create({
      name,
      videoUrl,
      description,
    })

    await this.exercisesRepository.create(exercise)

    return { exercise }
  }
}
