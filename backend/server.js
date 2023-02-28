const app = require("./app")
const dotenv = require("dotenv")
const cloudinary = require("cloudinary")
const connectDatabase = require("./database")

// config
dotenv.config({ path: "./backend/config/config.env" })

// connecting to Database
connectDatabase()



// Cloudinary setup

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

 app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})