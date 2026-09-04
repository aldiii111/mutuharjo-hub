import { Router, type IRouter } from "express"
import { requireAdminSession } from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js"
import { updatePpdbStatusSchema, updatePembayaranStatusSchema } from "../lib/admin.schema.js"
import { updatePembayaranStatusController, updatePpdbStatusController } from "../controllers/admin.controller.js"

const adminRouter: IRouter = Router()
adminRouter.use(requireAdminSession)
adminRouter.patch("/ppdb/:id", validate(updatePpdbStatusSchema), updatePpdbStatusController)
adminRouter.patch("/pembayaran/:id", validate(updatePembayaranStatusSchema), updatePembayaranStatusController)

export { adminRouter }