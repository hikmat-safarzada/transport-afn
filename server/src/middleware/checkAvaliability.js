const Booking = require("../models/Booking");

const checkAvaliability = async (req, res, next) => {
  try {
    const { startDate, endDate, car } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        message: "Invalid start or end date format",
      });
    }

    if (start < now) {
      return res.status(400).json({
        message: "Start date cannot be in the past",
      });
    }

    if (start >= end) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }

    const overlappingBooking = await Booking.findOne({
      car,
      status: { $ne: "cancelled" },
      startDate: { $lt: end },
      endDate: { $gt: start },
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: "Car is already booked for these dates",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = checkAvaliability;