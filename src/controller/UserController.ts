import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { LoginDto, LoginStatusCode } from "../types";
import { LogicError } from "../types/index";

export class UserController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body;
      if (!loginDto.email) {
        res.status(400).json({
          status: LoginStatusCode.MISSING_EMAIL,
        });
        return;
      }
      if (!loginDto.password) {
        res.status(400).json({
          status: LoginStatusCode.MISSING_PASSWORD,
        });
        return;
      }
      const { token } = await this.authService.login(loginDto);
      res.setHeader("auth-token", token);
      res.json({
        status: LoginStatusCode.LOGGED_IN,
      });
    } catch (e) {
      console.error(e.message);
      if (
        e.message === LogicError.WROND_PASSWORD ||
        e.message === LogicError.USER_EMAIL_NOT_FOUND
      ) {
        res.status(403).json({
          status: LoginStatusCode.ACCESS_DENIED,
        });
        return;
      }
      res.status(500).send();
    }
  }
}
