import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({

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


roleSchema.methods.hasPermission =
    function (permission: string): boolean {

        return this.permissions.includes(
            permission
        )

    }


export const Role =
    mongoose.model("Role", roleSchema)