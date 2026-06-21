import mongoose, { Document, Model } from "mongoose";

export interface IRole extends Document {
    name: string;
    serverId: mongoose.Types.ObjectId;
    description?: string;
    position: number;
    color?: string;
    permissions: string[];
    isDefault: boolean;
    mentionable: boolean;
    isManaged: boolean;
}

export interface IRoleMethods {
    hasPermission(permission: string): boolean;
}

export interface RoleModel extends Model<IRole, {}, IRoleMethods> { }
