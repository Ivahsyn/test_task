export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

export interface LoginDto {
  email?: string;
  password?: string;
}

export enum LoginStatusCode {
  LOGGED_IN = "logged in",
  ACCESS_DENIED = "access denied",
  MISSING_PASSWORD = "missing password",
  MISSING_EMAIL = "missing email",
}

export enum LogicError {
  USER_EMAIL_NOT_FOUND = "user_email_not_found",
  WROND_PASSWORD = "wrong_password",
}
