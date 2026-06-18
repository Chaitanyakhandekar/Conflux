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


export { httpServer }