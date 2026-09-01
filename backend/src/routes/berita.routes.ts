import { Router, type IRouter } from "express"
import { beritaController } from "../controllers/berita.controller.js"

const beritaRouter: IRouter = Router()

beritaRouter.get("/", (req, res) => {
  beritaController.getLatest(req, res)
})

export { beritaRouter }
