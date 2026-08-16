import { Router } from "express";
import { setupProfile } from "../controllers/user.controller.ts";
import { upload } from "../middlewares/upload.middleware.ts";
import { userAuth } from "../middlewares/userAuth.middleware.ts";

const router = Router()

router.route("/setup-profile").post(userAuth, upload.single("avatar"), setupProfile)

export default router;