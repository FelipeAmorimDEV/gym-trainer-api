import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryExercisesRepository } from '../../../../../test/repositories/in-memory-exercises-repository'
import { EditExerciseUseCase } from './edit-exercise'
import { Exercise } from '../../enterprise/entities/exercise'

let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: EditExerciseUseCase

describe('Edit Exercise', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    sut = new EditExerciseUseCase(inMemoryExercisesRepository)
  })

  it('should be able to edit a exercise', async () => {
    const exerciseCreated = Exercise.create({
      name: 'Supino Inclinado',
      videoUrl: 'http://youtube.com/supinoinclinado',
      description: 'Descrição',
    })

    await inMemoryExercisesRepository.create(exerciseCreated)

    const { exercise } = await sut.execute({
      exerciseId: exerciseCreated.id.toString(),
      name: 'Supino Reto',
      description: 'Descrição Alterada',
    })

    expect(exercise.id).toBeTruthy()
    expect(inMemoryExercisesRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Supino Reto',
      }),
    )
    expect(inMemoryExercisesRepository.items[0]).toEqual(
      expect.objectContaining({
        videoUrl: 'http://youtube.com/supinoinclinado',
      }),
    )
  })
})
