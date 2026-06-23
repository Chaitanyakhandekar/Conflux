import { Router } from "express";
import { registerUser, loginUser, resendOTPEmail, verifyOTP } from "../controllers/auth.controller.ts";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/resend-otp").post(resendOTPEmail)
router.route("/verify-otp").post(verifyOTP)

export default router;