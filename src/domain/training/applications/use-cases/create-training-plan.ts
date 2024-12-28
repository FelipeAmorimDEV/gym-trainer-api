import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import {
  TrainingPlan,
  TrainingStrategy,
} from '../../enterprise/entities/training-plan'
import { TrainingPlansRepository } from '../repositories/training-plans-repository'

interface CreateTrainingPlanUseCaseRequest {
  userId: string
  name: string
  goal: string
  sessionsPerWeek: number
  strategy: TrainingStrategy
  startDate: Date
  endDate: Date
}

interface CreateTrainingPlanUseCaseResponse {
  trainingPlan: TrainingPlan
}

export class CreateTrainingPlanUseCase {
  constructor(private trainingPlansRepository: TrainingPlansRepository) {}

  async execute({
    userId,
    name,
    goal,
    sessionsPerWeek,
    strategy,
    startDate,
    endDate,
  }: CreateTrainingPlanUseCaseRequest): Promise<CreateTrainingPlanUseCaseResponse> {
    const trainingPlan = TrainingPlan.create({
      userId: new UniqueEntityID(userId),
      name,
      goal,
      sessionsPerWeek,
      startDate,
      endDate,
      strategy,
    })

    await this.trainingPlansRepository.create(trainingPlan)

    return { trainingPlan }
  }
}
