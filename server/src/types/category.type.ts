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

export interface CategoryModel extends Model<ICategory, {}, ICategoryMethods> { }
