class ApiError extends Error {

    statusCode: number
    success: boolean
    data: any

    constructor(

        statusCode: number,

        message: string,

        data: any = null

    ) {

        super(message)      // calls Error constructor

        this.statusCode =
            statusCode

        this.success =
            false

        this.data =
            data

        Error.captureStackTrace(
            this,
            this.constructor
        )

    }
}

export {
    ApiError
}