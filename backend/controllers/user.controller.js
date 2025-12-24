import User from "../models/user.model.js";


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