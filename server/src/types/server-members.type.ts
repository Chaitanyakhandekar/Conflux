import mongoose, { Document, Model } from "mongoose";

export interface IServerMember extends Document {
    userId: mongoose.Types.ObjectId;
    serverId: mongoose.Types.ObjectId;
    roleIds: mongoose.Types.ObjectId[];
    nickname?: string;
    isMuted: boolean;
    isBanned: boolean;
    joinedAt: Date;
}

export interface IServerMemberMethods {
    hasRole(roleId: string): boolean;
    banMember(): Promise<void>;
}

export interface ServerMemberModel extends Model<IServerMember, {}, IServerMemberMethods> { }
