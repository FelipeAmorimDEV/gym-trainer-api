import { Admin } from "../../enterprise/entities/admin";
import { Student } from "../../enterprise/entities/student";
import { UsersRepository } from "../repositories/users-repository";

interface CreateStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateStudentUseCaseResponse {
  student: Student
}

export class CreateStudentUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, password }: CreateStudentUseCaseRequest): Promise<CreateStudentUseCaseResponse> {
    const student = Student.create({
      name,
      email,
      password,
    })

    this.usersRepository.create(student)


    return { student }
  }
}