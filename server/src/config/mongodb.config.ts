import mongoose from "mongoose";
import mongodb from "mongodb";
import dotenv from "dotenv"
import { env } from "./env.config.ts";
import { log } from "node:console";

/**
 * 
 * @description Method for establishing connection with mongodb atlas cluster
 */
async function connectDB(): Promise<void> {
    try {
        console.log('Connecting to MongoDB..');
        const connectionInfo = await mongoose.connect(env.MONGODB_ATLAS_URL)
        console.log(`MongoDB connected successfully: ${connectionInfo.connection.host}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("MongoDB :: Connection :: Error :: ", error.message)
            return
        }
        console.log("MongoDB :: Connection :: Error :: ", error)
        return
    }
}

export {
    connectDB
}