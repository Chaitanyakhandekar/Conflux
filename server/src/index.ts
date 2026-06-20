import { connectDB } from "./config/mongodb.config.ts";
import { httpServer } from "./app.ts"
import { env } from "./config/env.config.ts";
import { sendEmail } from "./providers/email.provider.ts";
import { addEmailJob } from "./producers/email.producer.ts";
import "./workers/email.worker.ts"


    ; connectDB()
        .then(async (): Promise<void> => {

            httpServer.listen(env.PORT, async () => {               // running server on port
                console.log('Server Running on Port ', env.PORT);
            })
        })