import { Exercise } from '../../enterprise/entities/exercise'
import { ExercisesRepository } from '../repositories/exercises-repository'
import { UsersAutorizationService } from '../repositories/users-autorization-service'

interface CreateExerciseUseCaseRequest {
  userId: string
  name: string
  videoUrl: string
  description?: string
}

interface CreateExerciseUseCaseResponse {
  exercise: Exercise
}

export class CreateExerciseUseCase {
  constructor(
    private userAutorizationService: UsersAutorizationService,
    private exercisesRepository: ExercisesRepository
  ) { }

  async execute({
    userId,
    name,
    videoUrl,
    description,
  }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      throw new Error("Not allowed.")
    }

    const exercise = Exercise.create({
      name,
      videoUrl,
      description,
    })

    await this.exercisesRepository.create(exercise)

    return { exercise }
  }
}
