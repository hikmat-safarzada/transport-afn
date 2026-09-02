const mongoose = require("mongoose");
const { config } = require("./config");

const connectDb = async() =>{
    try {
        await mongoose.connect(config.mongo_url.replace("<db_password>", config.mongo_pass));
        console.log("Db connected successfully")
    } catch (error) {
        console.log(error, "Connection failed")
    }
}
module.exports = connectDb