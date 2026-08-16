import { TokenPayload } from "google-auth-library";
import { ApiError } from "../types/error.type.ts";
import { ERROR_CODES } from "../constants/error-codes";

const continueWithGoogleValidator = (payload:TokenPayload):TokenPayload =>{
    
    if(!payload){
        throw new ApiError(400,"Token Payload Missing",ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if(!payload.email || (payload.email && payload.email.trim() === "")){
        throw new ApiError(401,"Email missing in Google Auth Payload.",ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if(!payload.email_verified){
        throw new ApiError(401,"Unverified Email By Google.",ERROR_CODES.ACCOUNT_NOT_VERIFIED)
    }
    return payload;
}

export {
    continueWithGoogleValidator
}