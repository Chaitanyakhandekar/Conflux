import Redis from "ioredis"
import { env } from "./env.config.ts";

function createRedisConnection(connectionName: string) {

    const redis = new Redis({

        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
        maxRetriesPerRequest: null,
        enableReadyCheck: true,
        retryStrategy(times) {          // after 100ms of connection failure it retries to connect

            return Math.min(
                times * 100,
                3000
            )

        }

    });

    redis.on("connect", () => {
        console.log(`${connectionName} connected`)
    })

    redis.on("error", (error: any) => {
        console.log(`${connectionName}`, error.message)
    })

    return redis
}

export const redisClient = createRedisConnection("Redis Client")


export const redisQueue = createRedisConnection("Redis Queue")


export const redisWorker = createRedisConnection("Redis Worker")