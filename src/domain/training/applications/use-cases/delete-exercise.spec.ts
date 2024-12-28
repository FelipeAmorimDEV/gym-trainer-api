import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryExercisesRepository } from '../../../../../test/repositories/in-memory-exercises-repository'
import { Exercise } from '../../enterprise/entities/exercise'
import { DeleteExerciseUseCase } from './delete-exercise'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: DeleteExerciseUseCase

describe('Delete Exercise', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    sut = new DeleteExerciseUseCase(inMemoryExercisesRepository)
  })

  it('should be able to delete an exercise', async () => {
    const exerciseCreated = Exercise.create(
      {
        name: 'Supino Inclinado',
        videoUrl: 'http://youtube.com/supinoinclinado',
        description: 'Descrição',
      },
      new UniqueEntityID('exercise-1'),
    )

    await inMemoryExercisesRepository.create(exerciseCreated)

    await sut.execute({
      exerciseId: 'exercise-1',
    })

    expect(inMemoryExercisesRepository.items).toHaveLength(0)
  })
})
