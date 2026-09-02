const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    },
    role: {
        type: String,
        enum: [ "renter", "owner"],
        default: "renter"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema, "users")