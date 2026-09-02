const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const verifyToken = (req, res, next) => {
    try {
        if (req.method === 'OPTIONS') {
            return next();
        }

        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, config.jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: error.message
        });
    }
};

const checkRole = (...roles) => {
    return (req, res, next) => {
        try {
            if (req.method === 'OPTIONS') {
                return next();
            }

            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({
                    message: `Access denied. Required roles: ${roles.join(", ")}`
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({ 
                message: error.message
            });
        }
    };
};

module.exports = { verifyToken, checkRole };