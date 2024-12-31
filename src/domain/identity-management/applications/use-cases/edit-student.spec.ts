import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../test/repositories/in-memory-users-repository";
import { EditStudentUseCase } from "./edit-student";
import { makeStudent } from "../../../../../test/factories/make-student";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditStudentUseCase

describe("Edit Student", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditStudentUseCase(inMemoryUsersRepository)
  })

  it("should be able to edit a student", async () => {
    const newStudent = makeStudent({ name: 'John Doe' }, new UniqueEntityID("student-1"))
    inMemoryUsersRepository.create(newStudent)

    const { student } = await sut.execute({
      studentId: 'student-1',
      name: 'Felipe Amorim',
    })

    expect(student.name).toEqual("Felipe Amorim")
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: 'Felipe Amorim'
    })
  })
})