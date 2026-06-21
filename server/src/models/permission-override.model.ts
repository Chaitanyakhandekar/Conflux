import mongoose, { Schema } from "mongoose";
import {
    IPermissionOverride,
    IPermissionOverrideMethods,
    PermissionOverrideModel
} from "../types/permission-override.type.ts";

const permissionOverrideSchema =
    new Schema<IPermissionOverride, PermissionOverrideModel, IPermissionOverrideMethods>({

        channelId: {
            type: Schema.Types.ObjectId,
            ref: "Channel",
            required: true
        },

        roleId: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true
        },

        deniedPermissions: [{
            type: String
        }]

    }, { timestamps: true })


/**
 * @description Schema method to check if a permission is denied.
 * @param permission
 * @returns boolean
 */
permissionOverrideSchema.methods.hasDenied =
    function (
        permission: string
    ): boolean {

        return this.deniedPermissions.includes(
            permission
        )
    }


export const PermissionOverride =
    mongoose.model<IPermissionOverride, PermissionOverrideModel>(
        "PermissionOverride",
        permissionOverrideSchema
    )