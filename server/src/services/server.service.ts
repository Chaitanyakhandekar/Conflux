import { asyncHandler, decodeJWT, gnerateOTP } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { IUser, LoginUserType, RegisterUserType, SetupProfileType } from "../types/user.type.ts";
import { ApiError } from "../types/error.type.ts";
import { User } from "../models/user.model.ts";
import { addEmailJob } from "../producers/email.producer.ts";
import type { emailJobType } from "../types/job.type.ts";
import { getEmailVerificationHtml } from "../constants/index.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";
import { isUserExists } from "../utils/existance.ts";
import { generateAccessAndRefreshTokens } from "../utils/generateARTokens.ts";
import { LoginServiceReturnType } from "../types/auth.type.ts";
import { env } from "../config/env.config.ts";
import { uploadFileOnCloudinary } from "../providers/cloudinary.provider.ts";
import { ServerInfoType } from "../types/server.type.ts";
import { Server } from "../models/server.model.ts";
import { gamingTemplate } from "../constants/templates/gaming.template.ts";
import { developerTemplate } from "../constants/templates/developer.template.ts";
import { startupTemplate } from "../constants/templates/startup.template.ts";
import { studyTemplate } from "../constants/templates/study.template.ts";
import { Category } from "../models/category.model.ts";
import { CategoryTemplate, ChannelTemplate } from "../constants/templates/template.types.ts";
import { ChannelType } from "../types/channel.type.ts";
import { Channel } from "../models/channel.model.ts";
import mongoose from "mongoose";

/**
 * @description Service for creating server (custom , featured)
 * @param serverInfo 
 * @param user 
 * @returns 
 */
const createServerService = async (serverInfo: ServerInfoType, user: IUser): Promise<any> => {

    const server = await Server.create(serverInfo)

    if (!server) {
        throw new ApiError(500, "Server Creation Error.", ERROR_CODES.CREATE_FAILED)
    }

    let serverTemplate;

    switch (serverInfo?.serverType) {

        case "GAMING":
            serverTemplate = gamingTemplate
            break;

        case "DEVELOPER":
            serverTemplate = developerTemplate
            break;

        case "STARTUP":
            serverTemplate = startupTemplate
            break;

        case "STUDY":
            serverTemplate = studyTemplate
            break;

        case "CUSTOM":
            break;

    }

    const setup = await Promise.all(
        serverTemplate?.categories?.map(async (category: CategoryTemplate): Promise<any> => {
            const c = await Category.create({
                name: category?.name,
                serverId: server?._id,
                createdBy: user._id.toString()
            })

            return await Promise.all(
                category?.channels?.map(async (channel: ChannelTemplate) => {
                    return await Channel.create(
                        {
                            name: channel.name,
                            serverId: server._id,
                            categoryId: c._id,
                            type: channel.type as ChannelType,
                            createdBy: user._id
                        }
                    )
                })
            )

        }) || []
    )

    return { server, setup };

}

/**
 * @description Service for fetching all servers created by user
 * @param user 
 */
const getUserServersService = async (user:IUser, page:number=1, limit:number=10) : Promise<any> =>{

    const isUser = await isUserExists(user)

    const totalServers = await Server.countDocuments({ownerId:user._id})

    if(totalServers==0){
        return [];
    }
    
    const skip = (page * limit ) - 1;

    const servers = await Server.aggregate([
        {
            $match:{
                ownerId:new mongoose.Types.ObjectId(user._id)
            }
        },
        {
            $skip:skip
        },
        {
            $limit:limit
        },
        {
            $project:{
                ownerId:0
            }
        }
    ])

    if(!servers.length){
        throw new ApiError(500,"Server Error While Fetching Servers",ERROR_CODES.INTERNAL_SERVER_ERROR)
    }

    return servers;

}

export {
    createServerService,
    getUserServersService
}