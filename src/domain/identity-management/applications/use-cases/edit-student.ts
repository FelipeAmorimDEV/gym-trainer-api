import { Admin } from "../../enterprise/entities/admin";
import { Student } from "../../enterprise/entities/student";
import { UsersRepository } from "../repositories/users-repository";

interface EditStudentUseCaseRequest {
  studentId: string
  name: string
}

interface EditStudentUseCaseResponse {
  student: Student
}

export class EditStudentUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ studentId, name }: EditStudentUseCaseRequest): Promise<EditStudentUseCaseResponse> {
    const student = await this.usersRepository.findById(studentId)

    if (!student) {
      throw new Error("Student not found.")
    }

    student.name = name

    this.usersRepository.save(student)

    return { student }
  }
}