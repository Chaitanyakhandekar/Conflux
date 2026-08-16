import { Router } from "express";
import { registerUser, loginUser, resendOTPEmail, verifyOTP, authMe,continueWithGoogleController ,logoutUser} from "../controllers/auth.controller.ts";
import {userAuth} from "../middlewares/userAuth.middleware.ts"
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(userAuth,logoutUser)
router.route("/google").post(continueWithGoogleController)
router.route("/resend-otp").post(resendOTPEmail)
router.route("/verify-otp").post(verifyOTP)
router.route("/auth-me").get(authMe)

export default router;  