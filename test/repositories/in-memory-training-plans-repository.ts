import { TrainingPlansRepository } from '../../src/domain/training/applications/repositories/training-plans-repository'
import { TrainingPlan } from '../../src/domain/training/enterprise/entities/training-plan'

export class InMemoryTrainingPlansRepository
  implements TrainingPlansRepository
{
  public items: TrainingPlan[] = []

  async create(trainingPlan: TrainingPlan) {
    this.items.push(trainingPlan)
  }
}
