import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import genToken from "../config/token.js";
import crypto from "crypto";
import sendEmail from "../utills/sendEmail.js";
import { error } from "console";
import axios from "axios";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "user is already exist",
        error: true,
        success: false,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid Emial",
        error: true,
        success: false,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Enter strong password",
        error: true,
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    let token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully!!",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `signup error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        error: true,
        success: false,
      });
    }
    console.log("paswword m--", isMatch);

    let token = genToken(user._id);
    console.log("ttttt", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "LoggedIn successfully!!",
      error: false,
      success: true,
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: `login error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // localhost
    });

    return res.status(200).json({
      message: "Logout successfull",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Logout error: ${error.message}`,
      error: true,
      success: false,
    });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = crypto.randomInt(100000, 999999).toString();

    const user = await User.findOneAndUpdate(
      { email },
      {
        otp: otp,
        otpExpiry: Date.now() + 10 * 60 * 1000,
      }
    );
    if (!user) {
      return res.status(404).json({
        message: "User Not found",
        success: false,
        errror: true,
      });
    }

    console.log("save otp in db", user);

    await sendEmail(
      email,
      "Password Reset OTP",

      `
<h2 style="color:#2563eb; margin-bottom:8px;">
  StudyZone
</h2>

<p style="font-size:16px; color:#0f172a;">
  You requested to reset your password.
</p>

<h2 style="
  font-size:28px;
  letter-spacing:4px;
  color:#2563eb;
  margin:16px 0;
">
  ${otp}
</h2>

<p style="font-size:14px; color:#475569;">
  ⏳ This OTP is valid for <strong>10 minutes</strong>.
</p>

<p style="font-size:13px; color:#64748b;">
  If you didn’t request this, please ignore this email.
</p>
`
    );

    res.status(200).json({
      message: "OTP send successfully",
      success: true,
      error: false,
      otp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `send email error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid OTP",
        success: false,
        errror: true,
      });
    }
    console.log("OTP", user);

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
        success: false,
        error: true,
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
        error: true,
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `verify OTP error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        message: "All field should be filled",
        success: false,
        error: true,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const updatedPassword = await User.findOneAndUpdate(
      { email },
      {
        password: hashPassword,
      }
    );

    return res.status(200).json({
      message: "password updated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        `reset password error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    // 1️⃣ Frontend se auth code aata hai
    const { code } = req.body;

    // console.log("code--",code);

    // 2️⃣ Google token endpoint pe request
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: "https://study-zone-eight.vercel.app/api/auth/google/callback"
    });

    // console.log("response--",response);

    // 3️⃣ Google se tokens milte hain
    const { access_token, id_token } = response.data;

    // 4️⃣ id_token se user info nikalo
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // console.log("userinfo--",userInfo);
    const { email, name, picture } = userInfo.data;

    // 5️⃣ (Future) DB me user save / find karo
    let user = await User.findOne({ email });
    if (!user) {
       user = await User.create({
        email: email,
        name: name,
        photoUrl: picture,
        password: null,
        role: null, // 🔥 role not decided yet
      });
    }

    // console.log("user--",user);

    // 6️⃣ Apna JWT banao
    const token = jwt.sign(
      { userId: user?._id, email: user?.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // console.log("Token--",token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
      
     

    // 7️⃣ Frontend ko response
    res.status(200).json({
      message: "google auth successfully",
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error.response?.data || error);
    res.status(400).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

export const selectRole = async (req,res)=>{
  try {
    const userId = req.userId;
    console.log("userId",userId);

    const {role} = req.body;

    const user = await User.findByIdAndUpdate(userId,{
      role:role
    },{
      new:true
    })

    if(!user){
      return res.status(400).json({
        message:"unable to set Role",
        success:false
      })
    }

  return res.status(200).json({
    message:"role updated successfully",
    success:true,
    user
  })

  } catch (error) {
      return res.status(500).json({
      message:
        `select role error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
}
