import mongoose, { Schema } from "mongoose";

const permissionOverrideSchema =
    new Schema({

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


permissionOverrideSchema.methods.hasDenied =
    function (
        permission: string
    ): boolean {

        return this.deniedPermissions.includes(
            permission
        )
    }


export const PermissionOverride =
    mongoose.model(
        "PermissionOverride",
        permissionOverrideSchema
    )