import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

/**
 * @description Express App
 */
const app = express()


/**
 * @description Http Server created using express App
 */
const httpServer = createServer(app)

app.use(cors({
    origin: process.env.ALLOW_ORIGIN || ["http://localhost:5173", ""],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))


import userRouter from "./routes/user.route.ts"
import authRouter from "./routes/auth.route.ts"
import serverRouter from "./routes/server.route.ts"
import serverMemberRouter from "./routes/server-members.route.ts"
import roleRouter from "./routes/role.route.ts"
import permissionOverrideRouter from "./routes/permisson-override.route.ts"
import channelRouter from "./routes/channel.route.ts"
import conversationRouter from "./routes/conversation.route.ts"
import messageRouter from "./routes/message.route.ts"


app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/servers", serverRouter)
app.use("/api/v1/server-members", serverMemberRouter)
app.use("/api/v1/roles", roleRouter)
app.use("/api/v1/permission-overrides", permissionOverrideRouter)
app.use("/api/v1/channels", channelRouter)
app.use("/api/v1/conversations", conversationRouter)
app.use("/api/v1/messages", messageRouter)


export { httpServer }