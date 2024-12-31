import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../test/repositories/in-memory-users-repository";
import { EditStudentUseCase } from "./edit-student";
import { makeStudent } from "../../../../../test/factories/make-student";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { DeleteStudentUseCase } from "./delete-student";

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteStudentUseCase

describe("Delete Student", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteStudentUseCase(inMemoryUsersRepository)
  })

  it("should be able to delete a student", async () => {
    const newStudent = makeStudent({ name: 'John Doe' }, new UniqueEntityID("student-1"))
    inMemoryUsersRepository.create(newStudent)

    await sut.execute({
      studentId: 'student-1'
    })

    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })
})