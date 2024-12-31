import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'
import { UsersAutorizationService } from '../repositories/users-autorization-service'

interface EditExerciseUseCaseRequest {
  userId: string
  exerciseId: string
  name?: string
  videoUrl?: string
  description?: string
}

interface EditExerciseUseCaseResponse {
  exercise: Exercise
}

export class EditExerciseUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private exercisesRepository: ExercisesRepository
  ) { }

  async execute({
    userId,
    exerciseId,
    name,
    videoUrl,
    description,
  }: EditExerciseUseCaseRequest): Promise<EditExerciseUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      throw new Error("Not allowed.")
    }

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
