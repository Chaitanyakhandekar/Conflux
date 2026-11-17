import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware";
import { createServerController, deleteAllServersController, getUserServersController } from "../controllers/server.controller.ts";

const router = Router()

router.route("/").post(userAuth, createServerController)
router.route("/my").get(userAuth, getUserServersController)
router.route("/cleanup").get(userAuth, deleteAllServersController)

export default router;