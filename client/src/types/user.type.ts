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


export type User = {
    _id: string;
    username: string;
    email: string;
    fullName?: string;
    displayName?: string;
    setupProfile: boolean;

    avatar?: {
        secure_url?: string;
        public_id?: string;
    };

    bio?: string;
    isVerified: boolean;
    lastActive?: Date;

    OTPGeneratedAt?: Date;
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