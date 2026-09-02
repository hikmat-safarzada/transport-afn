const Car = require("../models/Car")

const getCars = async (req, res) => {
    try {
        const { brand, category, year, model, page, limit } = req.query;
        const filter = {};

        // Sərbəst yazı və böyük/kiçik hərf həssaslığı olmaması üçün $regex istifadə edirik
        if (brand) {
            filter.brand = { $regex: brand.trim(), $options: "i" };
        }
        if (category) {
            filter.category = { $regex: category.trim(), $options: "i" };
        }
        if (model) {
            filter.model = { $regex: model.trim(), $options: "i" };
        }
        if (year) {
            filter.year = year; // İl adətən rəqəm olduğu kimi qalır
        }

        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        const cars = await Car.find(filter).skip(skip).limit(limitNumber);
        const total = await Car.countDocuments(filter);

        res.status(200).json({
            message: "cars",
            cars,
            pagination: {
                total,
                page: pageNumber,
                totalPages: Math.ceil(total / limitNumber)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const createCar = async (req, res) => {
    try {
        // 1. Göndərilən faylların yollarını massivə yığırıq
        let imagePaths = [];
        console.log("Gelen fayllar" , req.files)
        if (req.files && req.files.length > 0) {
            // Əgər Cloudinary istifadə edirsənsə file.path, yerli qovluqdadırsa file.filename və ya uyğun yol
            imagePaths = req.files.map(file => file.path);
        }

        // 2. Yeni maşın obyektini yaradırıq
        const newCar = new Car({
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            year: req.body.year,
            pricePerDay: req.body.pricePerDay,
            transmission: req.body.transmission,
            fuelType: req.body.fuelType,
            engineCapacity: req.body.engineCapacity,
            images: imagePaths,
            owner: req.user.id
        });

        await newCar.save();

        res.status(201).json({
            success: true,
            message: "Maşın uğurla yaradıldı",
            car: newCar,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        if (!car) {
            return res.status(404).json({
                message: "Not car found"
            })
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        if (!car) {
            return res.status(404).json({
                message: "Not car found"
            })
        }

        if (car.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own cars"
            })
        }

        const upCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            message: "Car updated successfully",
            upCar
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            })
        }

        if (car.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own cars"
            })
        }

        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Car deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getMyCars = async (req, res) => {
    try {
        // verifyToken middleware-dən gələn istifadəçi ID-si (req.user.id) ilə axtarış edirik
        const myCars = await Car.find({ owner: req.user.id });

        res.status(200).json({
            message: "My cars fetched successfully",
            cars: myCars
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getCars,
    createCar,
    getCar,
    updateCar,
    deleteCar,
    getMyCars
}