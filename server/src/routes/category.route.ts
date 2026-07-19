import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware.ts";
import { createCategoryController, getServerCategoriesController } from "../controllers/category.controller.ts";

const router = Router()

router.route("/").post(userAuth, createCategoryController)
router.route("/server/:id").get(userAuth, getServerCategoriesController)

export default router;