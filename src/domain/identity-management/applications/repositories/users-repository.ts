import { Admin } from "../../enterprise/entities/admin";
import { Student } from "../../enterprise/entities/student";

export interface UsersRepository {
  findById(userId: string): Promise<Student | null>
  create(user: Student | Admin): Promise<void>
  save(user: Student | Admin): Promise<void>
  delete(user: Student | Admin): Promise<void>
}