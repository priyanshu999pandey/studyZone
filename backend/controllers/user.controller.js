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

export const editProfile = async(req,res)=>{
    try {

        const userId = req.userId;

        const {name,email,description} = req.body;

        let photoUrl;

        if(req.file){
             photoUrl = await uploadOnCloudinary(req.file.path);    
        }
        console.log("req.file",req.file)
        console.log("photourl",photoUrl)

        const user = await User.findByIdAndUpdate(userId,{
            name,
            email,
            description,
            photoUrl
        },{new:true})

        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"profile Updated sucessfully",
            success:true,
            user,
        })

        
    } catch (error) {
      return res.status(500).json({
      message: `editprofile error: ${error.message}`,
      error: true,
      success: false,
    });
    }
}