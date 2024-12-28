import { beforeEach, describe, expect, it } from 'vitest'
import { CreateExerciseUseCase } from './create-exercise'
import { InMemoryExercisesRepository } from '../../../../../test/repositories/in-memory-exercises-repository'

let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: CreateExerciseUseCase

describe('Create Exercise', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    sut = new CreateExerciseUseCase(inMemoryExercisesRepository)
  })

  it('should be able to create a exercise', async () => {
    const { exercise } = await sut.execute({
      name: 'Supino Reto',
      videoUrl: 'http://youtube.com/supinoreto',
      description: 'Descrição',
    })

    expect(exercise.id).toBeTruthy()
    expect(inMemoryExercisesRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Supino Reto',
      }),
    )
  })
})
