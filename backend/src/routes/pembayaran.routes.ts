import { Router, type IRouter } from "express";
import { validate } from "../middlewares/validate.js";
import { createPembayaranSchema } from "../lib/pembayaran.schema.js";
import { submitKonfirmasiBayarController, getStatusPembayaranController } from "../controllers/pembayaran.controller.js";

const pembayaranRouter: IRouter = Router();

pembayaranRouter.post("/", validate(createPembayaranSchema), submitKonfirmasiBayarController);

pembayaranRouter.get("/:nomorPendaftaran", getStatusPembayaranController);

export { pembayaranRouter }