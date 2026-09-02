const { register, login, getMe, forgotPassword, resetPassword, logout } = require("../controllers/auth.controllers")

const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/me", verifyToken, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router