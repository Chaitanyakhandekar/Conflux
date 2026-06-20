class ApiError extends Error {

    statusCode: number
    success: boolean
    errorCode: string
    data: any

    constructor(

        statusCode: number,

        message: string,

        errorCode: string,


        data: any = null

    ) {

        super(message)      // calls Error constructor

        this.statusCode =
            statusCode

        this.success =
            false

        this.errorCode = errorCode

        this.data =
            data

        Error.captureStackTrace(
            this,
            this.constructor
        )

    }
}


class ApiResponse {

    statusCode: number
    success: boolean
    data: any

    constructor(

        statusCode: number,

        message: string,

        data: any = null

    ) {


        this.statusCode =
            statusCode

        this.success =
            true

        this.data =
            data

    }
}

export {
    ApiError,
    ApiResponse
}