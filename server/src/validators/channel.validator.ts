import { ERROR_CODES } from "../constants/error-codes";
import { ChannelDataType } from "../types/channel.type.ts";
import { ApiError } from "../types/error.type.ts";

const createChannelValidator = (channelData: ChannelDataType): ChannelDataType => {

    if (!channelData.name.trim() || channelData.name.trim() === "") {
        throw new ApiError(400, "Non Empty Name is required", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    return channelData;

}

export {
    createChannelValidator
}