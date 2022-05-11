import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
