import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "studyZone",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      ).end(fileBuffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
