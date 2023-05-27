import { Router } from "express";
import { authValidators } from "../validators";
import { loginController } from "../controllers";

const loginRoute = Router()

loginRoute.route('/login').post(authValidators.login, loginController.login)

export { loginRoute }