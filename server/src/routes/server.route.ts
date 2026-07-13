import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware";
import { createServerController,getUserServersController } from "../controllers/server.controller.ts";

const router = Router()

router.route("/").post(userAuth, createServerController)
router.route("/my").get(userAuth, getUserServersController)

export default router;