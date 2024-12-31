import { UsersAutorizationService } from "../../../training/applications/repositories/users-autorization-service";
import { UsersRepository } from "../repositories/users-repository";

export class UserAutorizationServiceImpl implements UsersAutorizationService {
  constructor(private usersRepository: UsersRepository) { }
  async isAdmin(userId: string) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error("User not found.")
    }

    return user.role > 1
  }

}