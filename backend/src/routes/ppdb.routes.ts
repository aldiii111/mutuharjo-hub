import { Router, type IRouter } from "express"
import { validate } from "../middlewares/validate.js"
import { createPpdbSchema } from "../lib/ppdb.schema.js"
import { createPendaftarController, getPendaftarController } from "../controllers/ppdb.controller.js"

const ppdbRouter: IRouter = Router()
ppdbRouter.post("/", validate(createPpdbSchema), createPendaftarController)
ppdbRouter.get("/:nomorPendaftaran", getPendaftarController)
export { ppdbRouter }
