import { Worker } from "bullmq";
import { redisWorker } from "../config/redis.config.ts";
import { emailJobType } from "../types/job.type.ts";
import { sendEmail } from "../providers/email.provider.ts";


export const emailWorker = new Worker<emailJobType>(
    "email-queue",
    async (job): Promise<void> => {
        console.log('New Job Recived');

        await sendEmail(job.data)
        console.log('Email Sent');
    },
    {
        connection: redisWorker
    }
) 