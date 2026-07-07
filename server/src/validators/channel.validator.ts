import { isValidObjectId } from "mongoose";
import { ERROR_CODES } from "../constants/error-codes";
import { ChannelDataType } from "../types/channel.type.ts";
import { ApiError } from "../types/error.type.ts";

const createChannelValidator = (channelData: ChannelDataType): ChannelDataType => {

    if (!channelData.name.trim() || channelData.name.trim() === "") {
        throw new ApiError(400, "Non Empty Name is required", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if (!isValidObjectId(channelData.categoryId)) {
        throw new ApiError(400, "Valid Category Id Required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if (!isValidObjectId(channelData.serverId)) {
        throw new ApiError(400, "Valid Server Id Required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if (!isValidObjectId(channelData.createdBy)) {
        throw new ApiError(400, "Valid User Id Required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    return channelData;

}

export {
    createChannelValidator
}