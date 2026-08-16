import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import { env } from "../config/env.config.ts"

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
})



/**
 * @description utility function for cloudinary file upload service 
 * 
 * @param {String} localFilePath
 * @param {String} resourceType - default (auto)
 * 
 * @returns response Object {uploadInfo , success:true/false}
 */

const uploadFileOnCloudinary = async function (localFilePath: string, resourceType: "image" | "video" | "raw" | "auto" = "auto"): Promise<any> {
    try {
        if (!localFilePath) return null

        const uploadInfo = await cloudinary.uploader.upload(localFilePath, { resource_type: resourceType })

        fs.unlinkSync(localFilePath)
        console.log("File Upload Succesfully ", uploadInfo)
        return { ...uploadInfo, success: true };

    } catch (error: any) {
        console.log("upload file on cloudinary :: error :: ", error)
        return {
            success: false,
            message: "Upload falied",
            error: error.message
        };
    }
}

const deleteFileFromCloudinary = async function (publicId: string, resourceType: string = "image") {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })

        if (result.result !== "ok" && result.result !== "not found") {
            throw new Error("Cloudinary Deletion Failed")
        }

        console.log(result)
        return result

    } catch (error) {
        return {
            success: false,
            message: "deletion from cloudinary failed"
        }
    }
}


export {
    uploadFileOnCloudinary,
    deleteFileFromCloudinary
}