export type LoginServiceReturnType = {
    user: object,
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}