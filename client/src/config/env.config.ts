type EnvType = {
    SERVER_URL_LOCAL: string
    SERVER_URL_PRODUCTION: string
    VITE_ENV: "production" | "development"
}

export const env: EnvType = {
    SERVER_URL_LOCAL: (import.meta.env.SERVER_URL_LOCAL as string),
    SERVER_URL_PRODUCTION: (import.meta.env.SERVER_URL_LOCAL as string),
    VITE_ENV: import.meta.env.SERVER_URL_LOCAL
}