const mongoose = require("mongoose")

const connectDb = async() => {
    await mongoose.connect("mongodb://localhost:27017/PIZZARIADB")
    console.log("mongoDb connected")
}

module.exports = connectDb