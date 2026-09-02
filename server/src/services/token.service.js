const crypto = require("crypto");
const hashToken = require("../utils/hashToken");

const generateResetToken = () => {
    const token = crypto.randomBytes(32).toString("hex");
    return {
        token,
        hashedToken : hashToken(token)
    }
}

module.exports = {
    generateResetToken
}