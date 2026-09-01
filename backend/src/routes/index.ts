import { Router, type IRouter } from "express"
import { healthRouter } from "./health.routes.js"
import { bludRouter } from "./blud.routes.js"
import { beritaRouter } from "./berita.routes.js"
import { uploadRouter } from "./upload.routes.js"
import { chatbotRouter } from "./chatbot.routes.js"

const apiRouter: IRouter = Router()

apiRouter.use(healthRouter)
apiRouter.use("/blud", bludRouter)
apiRouter.use("/berita", beritaRouter)
apiRouter.use("/upload", uploadRouter)
apiRouter.use("/chatbot", chatbotRouter)

export { apiRouter }
