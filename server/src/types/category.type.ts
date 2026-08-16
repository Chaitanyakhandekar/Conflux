import mongoose, { Document, Model } from "mongoose";

export interface ICategory extends Document {
    name: string;
    position: number;
    serverId: mongoose.Types.ObjectId;
    createdBy?: string;
}

export interface ICategoryMethods {
    updatePosition(position: number): Promise<void>;
}

export type CategoryDataType = {
    name: string;
    position?: number;
    serverId: mongoose.Types.ObjectId | string;
    createdBy?: string;
}

export interface CategoryModel extends Model<ICategory, {}, ICategoryMethods> { }
