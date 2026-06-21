import mongoose, { Schema } from "mongoose";
import {
    IRole,
    IRoleMethods,
    RoleModel
} from "../types/role.type.ts";

const roleSchema = new Schema<IRole, RoleModel, IRoleMethods>({

    name: {
        type: String,
        required: true
    },

    serverId: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true
    },

    description: {
        type: String
    },

    position: {
        type: Number,
        default: 0
    },

    color: {
        type: String
    },

    permissions: [{
        type: String
    }],

    isDefault: {
        type: Boolean,
        default: false
    },

    mentionable: {
        type: Boolean,
        default: false
    },

    isManaged: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


/**
 * @description Schema method to check if the role has a specific permission.
 * @param permission
 * @returns boolean
 */
roleSchema.methods.hasPermission =
    function (permission: string): boolean {

        return this.permissions.includes(
            permission
        )

    }


export const Role =
    mongoose.model<IRole, RoleModel>("Role", roleSchema)