import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../test/repositories/in-memory-users-repository";
import { CreateStudentUseCase } from "./create-student";


let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateStudentUseCase
describe("Create Student", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateStudentUseCase(inMemoryUsersRepository)
  })
  it("should be able to create a student", async () => {
    const { student } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(student.id).toBeTruthy()
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: 'John Doe'
    })
  })
})