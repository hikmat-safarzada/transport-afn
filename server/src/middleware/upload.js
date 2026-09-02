const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "afn-transport/cars",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})

const upload = multer({storage});

module.exports = upload