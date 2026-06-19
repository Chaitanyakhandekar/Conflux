import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

type EnvConfig = {
    PORT: number
    ALLOW_ORIGIN: string
    MONGODB_ATLAS_URL: string
    JWT_ACCESS_SECRET: string
    EXPIRES_IN_ACCESS_TOKEN: string
    JWT_REFRESH_SECRET: string
    EXPIRES_IN_REFRESH_TOKEN: string
}

export const env: EnvConfig = {
    PORT: Number(process.env.PORT),
    ALLOW_ORIGIN: (process.env.ALLOW_ORIGIN as string),
    MONGODB_ATLAS_URL: (process.env.MONGODB_ATLAS_URL as string),
    JWT_ACCESS_SECRET: (process.env.JWT_ACCESS_SECRET as string),
    EXPIRES_IN_ACCESS_TOKEN: (process.env.EXPIRES_IN_ACCESS_TOKEN as string),
    JWT_REFRESH_SECRET: (process.env.JWT_ACCESS_SECRET as string),
    EXPIRES_IN_REFRESH_TOKEN: (process.env.EXPIRES_IN_ACCESS_TOKEN as string),
}