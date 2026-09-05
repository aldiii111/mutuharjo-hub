import { Router, type IRouter } from "express"
import { requireAdminSession } from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js"
import { updatePpdbStatusSchema, updatePembayaranStatusSchema, createBeritaSchema, updateBeritaSchema, createProdukSchema, updateProdukSchema } from "../lib/admin.schema.js"
import { updatePembayaranStatusController, updatePpdbStatusController, createBeritaController, updateBeritaController, deleteBeritaController, createProdukController, updateProdukController, deleteProdukController } from "../controllers/admin.controller.js"

const adminRouter: IRouter = Router()
adminRouter.use(requireAdminSession)
adminRouter.patch("/ppdb/:id", validate(updatePpdbStatusSchema), updatePpdbStatusController)
adminRouter.patch("/pembayaran/:id", validate(updatePembayaranStatusSchema), updatePembayaranStatusController)

adminRouter.post("/berita", validate(createBeritaSchema), createBeritaController)
adminRouter.put("/berita/:id", validate(updateBeritaSchema), updateBeritaController)
adminRouter.delete("/berita/:id", deleteBeritaController)

adminRouter.post("/blud", validate(createProdukSchema), createProdukController)
adminRouter.put("/blud/:id", validate(updateProdukSchema), updateProdukController)
adminRouter.delete("/blud/:id", deleteProdukController)

export { adminRouter }