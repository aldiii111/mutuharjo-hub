import { Router, type IRouter, type Request, type Response } from "express"
import { chatbotController } from "../controllers/chatbot.controller.js"

const chatbotRouter: IRouter = Router()

chatbotRouter.post("/", (req: Request, res: Response) => {
  void chatbotController.ask(req, res)
})

export { chatbotRouter }

