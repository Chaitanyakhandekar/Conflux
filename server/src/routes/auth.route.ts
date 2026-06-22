import { Router } from "express";
import { registerUser, resendOTPEmail, verifyOTP } from "../controllers/user.controller.ts";

const router = Router()

router.route("/register").post(registerUser)
router.route("/resend-otp").post(resendOTPEmail)
router.route("/verify-otp").post(verifyOTP)

export default router;