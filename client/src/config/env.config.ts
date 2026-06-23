type EnvType = {
    VITE_SERVER_URL_LOCAL: string
    VITE_SERVER_URL_PRODUCTION: string
    VITE_ENV: string
}

export const env: EnvType = {
    VITE_SERVER_URL_LOCAL: import.meta.env.VITE_SERVER_URL_LOCAL,
    VITE_SERVER_URL_PRODUCTION: import.meta.env.VITE_SERVER_URL_PRODUCTION,
    VITE_ENV: import.meta.env.VITE_ENV
}