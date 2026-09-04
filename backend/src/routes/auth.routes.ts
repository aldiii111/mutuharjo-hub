import { Router, type IRouter } from "express"
import { validate } from "../middlewares/validate.js"
import { loginSchema } from "../lib/auth.schema.js"
import { requireAdminSession } from "../middlewares/auth.js"
import { loginController, logoutController } from "../controllers/auth.controller.js"

const authRouter: IRouter = Router()
authRouter.post("/login", validate(loginSchema), loginController)
authRouter.post("/logout", requireAdminSession, logoutController)
export { authRouter }