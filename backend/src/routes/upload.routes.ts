import { Router, type IRouter } from "express"
import { uploadController } from "../controllers/upload.controller.js"

const uploadRouter: IRouter = Router()

uploadRouter.post("/", (req, res) => {
  uploadController.uploadMedia(req, res)
})

export { uploadRouter }
