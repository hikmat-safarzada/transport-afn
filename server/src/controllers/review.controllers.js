const Car = require("../models/Car")
const Review = require("../models/Review")
const mongoose = require("mongoose")
const createReview = async (req, res) => {
    try {
        const {car: carId, comment, rating} = req.body;
        const car = await Car.findById(carId);
        if(!car){
            return res.status(404).json({
                message: "Car not Found"
            })
        }
        const review = await Review.create({
            car: carId,
            renter: req.user.id,
            rating,
            comment
        })
        res.status(201).json({
            message: "Review created successfully",
            review
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getReviewsByCar = async (req, res) => {
    try {
        const { carId } = req.params;

        if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({
                message: "Keçərsiz Avtomobil ID-si"
            });
        }

        const reviews = await Review.find({ car: carId }).populate("renter", "name");
        
        return res.status(200).json({
            message: "reviews",
            reviews
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getReviewsByOwner = async (req, res) => {
    try {
        const cars = await Car.find({owner: req.user.id}).select("_id");
        const carIds = cars.map(car => car._id);
        const reviews = await Review.find({
            car: {$in: carIds}
        })
        .populate("renter", "name")
        .populate("car", "brand model");
        res.status(200).json({
            message: "Owner reviews",
            reviews
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}



const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review){
            return res.status(404).json({
                message: "Review not Found"
            })
        }
        if(review.renter.toString() !== req.user.id){
            return res.status(403).json({
                message: "You can only update your own reviews"
            })
        }
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            message: "Review updated successfully",
            updatedReview
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
        if(!review){
            return res.status(404).json({
                message: "Review not Found"
            })
        }
        if(review.renter.toString() !== req.user.id){
            return res.status(403).json({
                message: "You can only delete your own reviews"
            })
        }
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Review deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createReview,
    getReviewsByCar,
    updateReview,
    deleteReview,
    getReviewsByOwner
}