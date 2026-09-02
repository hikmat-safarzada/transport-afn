const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["econom", "business", "crossover_suv", "premium", "buses_minivans"],
        required: true
    },
    transmission: {
        type: String,
        default: "Avtomat"
    },
    fuelType: {
        type: String,
        required: true
    },
    engineCapacity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "available"
    },
    images: {
        type: [String],
        default: []
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Car", carSchema, "cars");