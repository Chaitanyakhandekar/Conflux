import { asyncHandler, gnerateOTP } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { RegisterUserType } from "../types/user.type.ts";
import { ApiError } from "../types/error.type.ts";
import { User } from "../models/user.model.ts";
import { addEmailJob } from "../producers/email.producer.ts";
import type { emailJobType } from "../types/job.type.ts";
import { getEmailVerificationHtml } from "../constants/index.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";

