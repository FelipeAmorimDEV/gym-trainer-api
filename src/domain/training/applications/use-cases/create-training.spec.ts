import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTrainingsRepository } from '../../../../../test/repositories/in-memory-trainings-repository'
import { CreateTrainingUseCase } from './create-training'
import { makeAdmin } from '../../../../../test/factories/make-admin'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { InMemoryUsersRepository } from '../../../../../test/repositories/in-memory-users-repository'
import { UserAutorizationServiceImpl } from '../../../identity-management/applications/services/user-autorization-service'
import { makeStudent } from '../../../../../test/factories/make-student'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let userAutorizationService: UserAutorizationServiceImpl
let sut: CreateTrainingUseCase

describe('Create Training', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTrainingsRepository = new InMemoryTrainingsRepository()
    userAutorizationService = new UserAutorizationServiceImpl(inMemoryUsersRepository)
    sut = new CreateTrainingUseCase(userAutorizationService, inMemoryTrainingsRepository)
  })

  it('should be able to create a session training', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(admin)

    const { training } = await sut.execute({
      userId: 'admin-1',
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

  it('should not be able to create a session training with student account', async () => {
    const student = makeStudent({}, new UniqueEntityID('student-1'))
    inMemoryUsersRepository.create(student)

    await expect(() => {
      return sut.execute({
        userId: 'student-1',
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
    }).rejects.toBeInstanceOf(Error)
  })
})
