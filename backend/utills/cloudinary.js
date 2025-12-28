
import dotenv from "dotenv"
dotenv.config()

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (localFilePath) => {
  try {

    console.log("api-key",process.env.CLOUDINARY_API_KEY)
    console.log("local path",localFilePath)
    if (!localFilePath) return null;

    // upload to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "studyZone",
      resource_type: "auto",
    });

     console.log("response",response)

    // delete local file after upload
    fs.unlinkSync(localFilePath);

    return response.secure_url;

  } catch (error) {
    // delete local file if upload fails
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
