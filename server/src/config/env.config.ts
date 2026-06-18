import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

type EnvConfig = {
    PORT: number
    ALLOW_ORIGIN: string
    MONGODB_ATLAS_URL: string
}

export const env: EnvConfig = {
    PORT: Number(process.env.PORT),
    ALLOW_ORIGIN: (process.env.ALLOW_ORIGIN as string),
    MONGODB_ATLAS_URL: (process.env.MONGODB_ATLAS_URL as string)
}