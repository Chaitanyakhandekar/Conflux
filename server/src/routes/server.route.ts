import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware";
import { createServerController } from "../controllers/server.controller.ts";

const router = Router()

router.route("/").post(userAuth, createServerController)

export default router;