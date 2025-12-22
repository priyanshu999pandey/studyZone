import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import genToken from "../config/token.js";


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
        message:"User created successfully!!",
        error:true,
        success:false,
        data:user
    })

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

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        error: true,
        success: false,
      });
    }

    let token = genToken(user._id);
    console.log("ttttt",token)

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

     return res.status(200).json({
        message:"LoggedIn successfully!!",
        error:true,
        success:false,
        data:user,
        token:token
    })

  } catch (error) {
    return res.status(500).json({
      message: `login error ${error.message}` || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false // localhost
    });

    return res.status(200).json({
      message: "Logout successful",
      error:false,
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

