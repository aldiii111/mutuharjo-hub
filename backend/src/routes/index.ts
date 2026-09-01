import { Router, type IRouter } from "express"
import { healthRouter } from "./health.routes.js"
import { ppdbRouter } from "./ppdb.routes.js"

const apiRouter: IRouter = Router()

apiRouter.use(healthRouter)
apiRouter.use("/ppdb", ppdbRouter)

export { apiRouter }
