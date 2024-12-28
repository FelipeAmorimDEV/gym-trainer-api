import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTrainingPlansRepository } from '../../../../../test/repositories/in-memory-training-plans-repository'
import { CreateTrainingPlanUseCase } from './create-training-plan'
import { TrainingStrategy } from '../../enterprise/entities/training-plan'

let inMemoryTrainingPlansRepository: InMemoryTrainingPlansRepository
let sut: CreateTrainingPlanUseCase

describe('Create Training Plan', () => {
  beforeEach(() => {
    inMemoryTrainingPlansRepository = new InMemoryTrainingPlansRepository()
    sut = new CreateTrainingPlanUseCase(inMemoryTrainingPlansRepository)
  })

  it('should be able to create a training plan', async () => {
    const { trainingPlan } = await sut.execute({
      userId: 'user-1',
      name: 'Treino Hipertrofia',
      goal: 'Hipertrofia',
      sessionsPerWeek: 3,
      strategy: TrainingStrategy.FIXED_DAYS,
      startDate: new Date(2024, 6, 10),
      endDate: new Date(2024, 9, 10),
    })

    expect(trainingPlan.id).toBeTruthy()
    expect(inMemoryTrainingPlansRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Treino Hipertrofia',
      }),
    )
  })
})
