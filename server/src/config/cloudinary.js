const cloudinary = require("cloudinary").v2;
const {config} = require("./config")
cloudinary.config({
    cloud_name: config.cloudinary_name,
    api_key : config.cloudinary_key,
    api_secret : config.cloudinary_secret
})

module.exports = cloudinary;