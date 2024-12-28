import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTrainingsRepository } from '../../../../../test/repositories/in-memory-trainings-repository'
import { CreateTrainingUseCase } from './create-training'

let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let sut: CreateTrainingUseCase

describe('Create Training', () => {
  beforeEach(() => {
    inMemoryTrainingsRepository = new InMemoryTrainingsRepository()
    sut = new CreateTrainingUseCase(inMemoryTrainingsRepository)
  })

  it('should be able to create a session training', async () => {
    const { training } = await sut.execute({
      trainingPlanId: 'training-plan-1',
      name: 'Treino A',
      type: 'SESSION',
      exercises: [
        {
          exerciseId: 'exercise-1',
          sets: 3,
          repetitions: 12,
          restTime: 60,
        },
      ],
    })

    expect(training.id).toBeTruthy()
    expect(
      inMemoryTrainingsRepository.items[0].exercises.currentItems[0].exerciseId.toString(),
    ).toEqual('exercise-1')
  })
})
