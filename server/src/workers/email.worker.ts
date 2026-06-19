import { Worker } from "bullmq";
import { redisWorker } from "../config/redis.config.ts";
import { emailJobType } from "../types/job.type.ts";

export const emailWorker = new Worker(
    "email-queue",
    async (job) => {

    }
)