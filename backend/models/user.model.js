import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    description:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["student","educator"],
        default:null
    },
    photoUrl:{
        type:String,
        default:""
    },
    enrolledCourses:[{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    }],
    otp:{
      type:String
    },
    otpExpiry:{
      type:Date
    }

},{
    timestamps:true
})

const User = mongoose.model("User",userSchema);
export default User
