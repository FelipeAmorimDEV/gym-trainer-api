import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'

interface EditExerciseUseCaseRequest {
  exerciseId: string
  name?: string
  videoUrl?: string
  description?: string
}

interface EditExerciseUseCaseResponse {
  exercise: Exercise
}

export class EditExerciseUseCase {
  constructor(private exercisesRepository: ExercisesRepository) {}

  async execute({
    exerciseId,
    name,
    videoUrl,
    description,
  }: EditExerciseUseCaseRequest): Promise<EditExerciseUseCaseResponse> {
    const exercise = await this.exercisesRepository.findById(exerciseId)

    if (!exercise) {
      throw new Error('Exercise not found.')
    }

    exercise.name = name ?? exercise.name
    exercise.videoUrl = videoUrl ?? exercise.videoUrl
    exercise.description = description ?? exercise.description

    await this.exercisesRepository.save(exercise)

    return { exercise }
  }
}
