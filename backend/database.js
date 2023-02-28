// Connect to Mongo db server 
const mongoose = require("mongoose");



const connectToMongo = async () => {
    mongoose.connect(process.env.DB_URI, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;