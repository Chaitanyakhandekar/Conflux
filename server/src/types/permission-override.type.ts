import mongoose, { Document, Model } from "mongoose";

export interface IPermissionOverride extends Document {
    channelId: mongoose.Types.ObjectId;
    roleId: mongoose.Types.ObjectId;
    deniedPermissions: string[];
}

export interface IPermissionOverrideMethods {
    hasDenied(permission: string): boolean;
}

export interface PermissionOverrideModel extends Model<IPermissionOverride, {}, IPermissionOverrideMethods> { }
