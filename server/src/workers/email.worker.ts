
import { Worker } from "bullmq";
import { redisWorker } from "../config/redis.config.ts";
import { emailJobType } from "../types/job.type.ts";
import { sendEmail } from "../providers/email.provider.ts";

export const emailWorker = new Worker<emailJobType>(
    "email-queue",
    async (job): Promise<void> => {
        console.log(`📥[EMAIL WORKER] Job received: ${job.id} `);

        await sendEmail(job.data);

        console.log(`✅[EMAIL WORKER] Email sent successfully | Job ID: ${job.id} `);
    },
    {
        connection: redisWorker,
    }
);

emailWorker.on("failed", (job, err) => {
    console.error(
        `❌[EMAIL WORKER] Job failed | Job ID: ${job?.id ?? "unknown"} | Error: ${err.message} `
    );
});