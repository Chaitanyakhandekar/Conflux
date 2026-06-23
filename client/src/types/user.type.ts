type RegisterUserType = {
    username: string
    email: string
    password: string
    fullName: string
    avatar?: string
}

type LoginUserType = {
    email: string
    password: string
}

export type {
    RegisterUserType,
    LoginUserType
}

export type LoginServiceReturnType = {
    user: object,
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}