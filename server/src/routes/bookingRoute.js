const express = require("express");
const { verifyToken, checkRole } = require("../middleware/auth.middleware");
const checkAvaliability = require("../middleware/checkAvaliability");
const { createBooking, getBookings, cancelBooking, getOwnerBookings } = require("../controllers/booking.controllers");
const router = express.Router();

router.post("/", verifyToken, checkAvaliability, createBooking)
router.get("/", verifyToken, getBookings);
router.put("/:id/cancel", verifyToken, cancelBooking)
router.get("/owner", verifyToken, checkRole("owner"), getOwnerBookings);

module.exports = router