import { Queue } from "bullmq"
import type { QueueOptions } from "bullmq"
import { env } from "../config/env.config.ts"
import { redisQueue } from "../config/redis.config.ts"

export const emailQueue = new Queue(
    "email-queue",
    {
        connection: redisQueue
    }
)
