import { TrainingsRepository } from '../../src/domain/training/applications/repositories/trainings-repository'
import { Training } from '../../src/domain/training/enterprise/entities/training'

export class InMemoryTrainingsRepository implements TrainingsRepository {
  public items: Training[] = []

  async create(training: Training) {
    this.items.push(training)
  }
}
