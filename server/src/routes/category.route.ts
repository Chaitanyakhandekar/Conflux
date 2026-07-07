import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware.ts";
import { createCategoryController } from "../controllers/category.controller.ts";

const router = Router()

router.route("/").post(userAuth, createCategoryController)

export default router;