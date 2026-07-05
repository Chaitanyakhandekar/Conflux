import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware.ts";
import { createChannelController } from "../controllers/channel.controller.ts";

const router = Router()

router.route("/").post(userAuth, createChannelController)

export default router;