import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: "post",
    route: "/api/login",
    controller: UserController,
    action: "login",
  },
];
