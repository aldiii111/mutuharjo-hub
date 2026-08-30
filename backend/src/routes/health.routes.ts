import { Router, type IRouter } from "express"
import { checkHealth } from "../controllers/health.controller.js"

const healthRouter: IRouter = Router()

healthRouter.get("/health", checkHealth)

export { healthRouter }
