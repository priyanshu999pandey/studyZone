import User from "../models/user.model.js";
import uploadOnCloudinary from "../utills/cloudinary.js";


export const getCurrentUser = async(req,res)=>{
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({
                message:"User not found",
                error:true,
                success:false,
            })
        }

        return res.status(200).json({
            message:"user found successfully!!",
            error:false,
            success:true,
            data:user
        })
        
    } catch (error) {
      return res.status(500).json({
      message: `getCurrentUser error: ${error.message}`,
      error: true,
      success: false,
    });
    }
}


export const editProfile = async (req, res) => {
  try {
    const userId = req.userId;  

    const { name, email, description } = req.body;

    const updateData = {
      name,
      email,
      description,
    };

    if (req.file) {
      const photoUrl = await uploadOnCloudinary(req.file.buffer);
      updateData.photoUrl = photoUrl;   // ✅ only update when file exists
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Edit profile error:", error);

    return res.status(500).json({
      message: `editProfile error: ${error.message}`,
      success: false,
    });
  }
};
