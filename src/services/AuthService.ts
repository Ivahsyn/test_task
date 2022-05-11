import { UserService } from "./UserService";
import { LoginDto, LogicError } from "../types/index";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthService {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    let user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new Error(LogicError.USER_EMAIL_NOT_FOUND);
    }
    const isPasswordMatch = await compare(loginDto.password, user.password);
    if (!isPasswordMatch) {
      throw new Error(LogicError.WROND_PASSWORD);
    }
    const token = this.generateToken(user.id);
    return { token };
  }

  generateToken(userId: string) {
    const accessToken = sign({ id: userId }, process.env.ACCESS_KEY_SECRET, {
      expiresIn: `${process.env.ACCESS_KEY_EXPIRATION_TIME}`,
    });
    return accessToken;
  }
}
