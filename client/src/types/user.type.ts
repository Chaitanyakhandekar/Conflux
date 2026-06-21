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