import { Router, type IRouter } from "express"
import { healthRouter } from "./health.routes.js"

const apiRouter: IRouter = Router()

apiRouter.use(healthRouter)

export { apiRouter }
