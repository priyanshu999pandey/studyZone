import jwt from "jsonwebtoken"
const isAuth = async(req,res,next)=>{
    try {
        const {token} = req.cookies
        console.log("token",token)
        if(!token){
            return res.status(401).json({
                message:"Token Not found",
                error:true,
                success:false
            })
        }

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(401).json({
                message:"Token not verified",
                error:true,
                success:false
            })
        }
        // console.log(verifyToken);
        req.userId = verifyToken.userId

        next();
    } catch (error) {
      return res.status(500).json({
      message: `isAuth error: ${error.message}`,
      error: true,
      success: false,
    });
    }
}

export default isAuth;