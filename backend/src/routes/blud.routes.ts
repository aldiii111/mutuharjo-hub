import { Router ,type IRouter } from "express";
import { bludController, BludController } from "../controllers/blud.controller.js";

const bludRouter:IRouter = Router();
bludRouter.get("/",(req,res) => {
    bludController.getAll(req,res)
})
bludRouter.get("/:id",(req,res) => {
    bludController.getById(req,res)
})

export {bludRouter}