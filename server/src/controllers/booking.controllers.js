const Booking = require("../models/Booking");
const Car = require("../models/Car");

const createBooking = async (req, res) => {
    try {
        const { car: carId, startDate, endDate, address, childSeat, personalDriver, paymentType, notes, city } = req.body;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        const existingBooking = await Booking.findOne({
            car: carId,
            status: { $ne: "cancelled" },
            $or: [
                { startDate: { $lt: end }, endDate: { $gt: start } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "Avtomobil seçilmiş tarixlər aralığında artıq bron olunub."
            });
        }

        // Günlərin hesablanması
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const getDiscountRate = (d) => {
            if (d >= 15) return 0.3;
            if (d >= 10) return 0.2;
            if (d >= 5) return 0.1;
            return 0;
        };

        const discountRate = getDiscountRate(days);
        const discountedPricePerDay = Math.round(car.pricePerDay * (1 - discountRate));

        let totalPrice = days * discountedPricePerDay;
        if (childSeat) totalPrice += 10 * days;
        if (personalDriver) totalPrice += 30 * days;

        const userId = req.user._id || req.user.id;

        const newBooking = await Booking.create({
            car: carId,
            renter: userId,
            startDate: start,
            endDate: end,
            city,
            notes,
            address,
            childSeat: childSeat || false,
            personalDriver: personalDriver || false,
            paymentType,
            totalPrice
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;

        // Sifarişləri yenidən köhnəyə doğru sıralamaq (.sort)
        const bookings = await Booking.find({ renter: userId })
            .populate("car")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "bookings",
            bookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" }); // 400 -> 404 düzəlişi
        }

        if (booking.renter.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You can only cancel your own bookings"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({ message: "Booking already cancelled" });
        }

        booking.status = "cancelled";
        await booking.save();

        res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOwnerBookings = async (req, res) => {
    try {
        const ownerId = req.user._id || req.user.id;
        const cars = await Car.find({ owner: ownerId }).select("_id")
        const carIds = cars.map(car => car._id);
        const bookings = await Booking.find({
            car: { $in: carIds }
        })
            .populate("car")
            .populate("renter", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "Owner bookings",
            bookings
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { createBooking, getBookings, cancelBooking, getOwnerBookings };