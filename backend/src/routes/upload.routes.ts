import { Router, type IRouter, type Request, type Response } from "express"
import { uploadController } from "../controllers/upload.controller.js"
import { upload } from "../lib/multer.js"

const uploadRouter: IRouter = Router()

uploadRouter.post("/", upload.single("file"), (req: Request, res: Response) => {
  void uploadController.uploadMedia(req, res)
})

export { uploadRouter }

