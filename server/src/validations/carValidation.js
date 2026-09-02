const Joi = require("joi")

const carValidation = Joi.object({
    brand: Joi.string().min(2).max(255).required().messages({
        "string.empty": "Brand is required",
        "string.min": "Brand must be at least 2 characters"
    }),
    model: Joi.string().min(1).max(128).required().messages({
        "string.empty": "Model is required",
    }),
    year: Joi.number().min(1990).max(new Date().getFullYear()).required().messages({
        "any.required": "Year is required",
        "number.min": "Year must be greater than or equal to 1990",
        "number.max": "Year cannot be in the future"
    }),
    pricePerDay: Joi.number().min(1).required().messages({
        "any.required": "Price per day is required",
        "number.min": "Price must be greater than zero"
    }),
    category: Joi.string().valid("econom", "business", "crossover_suv", "premium", "buses_minivans").required().messages({
        "any.required": "Category is required",
        "any.only": "Category must be one of: econom, business, crossover_suv, premium, buses_minivans"
    }),
    engineCapacity: Joi.string().max(5).required().messages({
        "string.empty": "Engine capacity is required"
    }),
    transmission: Joi.string().optional(),     // <-- Bunu əlavə edin
    fuelType: Joi.string().optional(),         // <-- Bunu əlavə edin
    engineCapacity: Joi.string().optional(),
    images: Joi.any().optional(),
})

module.exports = carValidation