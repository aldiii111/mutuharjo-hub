import { Router, type IRouter } from "express"
import { validate } from "../middlewares/validate.js"
import { createPpdbSchema } from "../lib/ppdb.schema.js"
import { createPendaftarController } from "../controllers/ppdb.controller.js"

const ppdbRouter: IRouter = Router()
ppdbRouter.post("/", validate(createPpdbSchema), createPendaftarController)
export { ppdbRouter }
