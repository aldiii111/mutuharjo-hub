import { Router, type IRouter } from "express"
import { healthRouter } from "./health.routes.js"
import { ppdbRouter } from "./ppdb.routes.js"
import { bludRouter } from "./blud.routes.js"
import { uploadRouter } from "./upload.routes.js"
import { chatbotRouter } from "./chatbot.routes.js"
import { pembayaranRouter } from "./pembayaran.routes.js"
import { authRouter } from "./auth.routes.js"
import { adminRouter } from "./admin.routes.js"

const apiRouter: IRouter = Router()

apiRouter.use(healthRouter)
apiRouter.use("/auth", authRouter)
apiRouter.use("/ppdb", ppdbRouter)
apiRouter.use("/blud", bludRouter)
apiRouter.use("/upload", uploadRouter)
apiRouter.use("/chatbot", chatbotRouter)
apiRouter.use("/pembayaran", pembayaranRouter)
apiRouter.use("/admin", adminRouter)

export { apiRouter }
