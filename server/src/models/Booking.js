const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    city: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    childSeat: {
        type: Boolean,
        default: false
    },
    personalDriver: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        default: ""
    },
    paymentType: {
        type: String,
        enum: ["online", "cash", "pos"],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");