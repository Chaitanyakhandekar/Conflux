import { emailQueue } from "../queues/email.queue.ts";
import type { emailJobType } from "../types/job.type.ts";

const addEmailJob = async (job: emailJobType): Promise<any> => {
    emailQueue.add(
        "send-email",
        job,
        {
            attempts: 3,        // retry 3 times 
            backoff: {                  // wait before retry
                type: "exponential",
                delay: 5000
            },
            removeOnComplete: true,
            removeOnFail: false
        }
    )
}