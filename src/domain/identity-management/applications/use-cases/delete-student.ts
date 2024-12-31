import { UsersRepository } from "../repositories/users-repository";

interface DeleteStudentUseCaseRequest {
  studentId: string
}

interface DeleteStudentUseCaseResponse { }

export class DeleteStudentUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ studentId }: DeleteStudentUseCaseRequest): Promise<DeleteStudentUseCaseResponse> {
    const student = await this.usersRepository.findById(studentId)

    if (!student) {
      throw new Error("Student not found.")
    }


    this.usersRepository.delete(student)

    return {}
  }
}