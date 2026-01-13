import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/index.ts';

// Only attempt to config if cloudinary variables are present
if (config.cloudinary.cloudName) {
    cloudinary.config({
        cloud_name: config.cloudinary.cloudName,
        api_key: config.cloudinary.apiKey!,
        api_secret: config.cloudinary.apiSecret!,
    });
}


export const uploadToCloudinary = async (fileStr: string, folder: string) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: `thecompanion/${folder}`,
        });
        return uploadResponse.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

export { cloudinary };
