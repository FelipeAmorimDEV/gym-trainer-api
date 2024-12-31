import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'
import { UsersAutorizationService } from '../repositories/users-autorization-service'

interface DeleteExerciseUseCaseRequest {
  userId: string
  exerciseId: string
}

interface DeleteExerciseUseCaseResponse {
  exercise: Exercise
}

export class DeleteExerciseUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private exercisesRepository: ExercisesRepository
  ) { }

  async execute({
    userId,
    exerciseId,
  }: DeleteExerciseUseCaseRequest): Promise<DeleteExerciseUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      throw new Error('Not Allowed.')
    }

    const exercise = await this.exercisesRepository.findById(exerciseId)

    if (!exercise) {
      throw new Error('Exercise not found.')
    }

    await this.exercisesRepository.delete(exercise)

    return { exercise }
  }
}
