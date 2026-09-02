const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { config } = require("../config/config");
const { generateResetToken } = require("../services/token.service");
const { RESET_PASSWORD_EXPIRE } = require("../utils/constants");
const { sendResetPasswordEmail } = require("../services/email.service");
const hashToken = require("../utils/hashToken");


const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(200).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            config.jwt_secret,
            { expiresIn: "14d" }
        )

        const isProduction = process.env.NODE_ENV === "production";
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "none",
            maxAge: 14 * 24 * 60 * 60 * 1000,
            path: "/"
        })

        res.cookie("role", user.role, {
            httpOnly: false,
            secure: isProduction,
            sameSite: "none",
            maxAge: 14 * 24 * 60 * 60 * 1000,
            path: "/"
        })

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";
        
        res.clearCookie("token", { 
            path: "/", 
            secure: isProduction, 
            sameSite: "none" 
        });
        res.clearCookie("role", { 
            path: "/", 
            secure: isProduction, 
            sameSite: "none" 
        });

        res.status(200).json({
            message: "Logged out successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({
                message: "Verification link has been sent!"
            })
        }
        const { token, hashedToken } = generateResetToken();
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + RESET_PASSWORD_EXPIRE
        await user.save();
        const resetLink = `${config.client_url}/reset-password?token=${token}`
        await sendResetPasswordEmail(user.email, resetLink)
        res.status(200).json({
            message: "Verification link has been sent!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body
        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters."
            });
        }
        const hashedToken = hashToken(token);
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        })
        if (!user) {
            return res.status(400).json({
                message: "Invalid token or expired"
            })
        }
        user.password = await bcrypt.hash(newPassword, 10)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({
            message: "Password changed successfully!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "user",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { register, login, getMe,
    forgotPassword, resetPassword, logout
 }
