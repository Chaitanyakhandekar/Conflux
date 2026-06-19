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
    REDIS_HOST: string
    REDIS_PORT: number
    REDIS_PASSWORD: string
    REDIS_DB: number
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    CLOUDINARY_URL: string
}

export const env: EnvConfig = {
    PORT: Number(process.env.PORT),
    ALLOW_ORIGIN: (process.env.ALLOW_ORIGIN as string),
    MONGODB_ATLAS_URL: (process.env.MONGODB_ATLAS_URL as string),
    JWT_ACCESS_SECRET: (process.env.JWT_ACCESS_SECRET as string),
    EXPIRES_IN_ACCESS_TOKEN: (process.env.EXPIRES_IN_ACCESS_TOKEN as string),
    JWT_REFRESH_SECRET: (process.env.JWT_ACCESS_SECRET as string),
    EXPIRES_IN_REFRESH_TOKEN: (process.env.EXPIRES_IN_ACCESS_TOKEN as string),
    REDIS_HOST: (process.env.REDIS_HOST as string),
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_PASSWORD: (process.env.REDIS_PASSWORD as string),
    REDIS_DB: Number(process.env.REDIS_DB),
    CLOUDINARY_CLOUD_NAME: (process.env.CLOUDINARY_CLOUD_NAME as string),
    CLOUDINARY_API_KEY: (process.env.CLOUDINARY_API_KEY as string),
    CLOUDINARY_API_SECRET: (process.env.CLOUDINARY_API_SECRET as string),
    CLOUDINARY_URL: (process.env.CLOUDINARY_URL as string),
}