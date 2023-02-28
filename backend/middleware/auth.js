const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");


exports.isAuthenticatedUser = async function (req, res, next) {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
        return next(new ErrorHandler("please login to access this resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    // console.log("sssss", decodedData.id);
    req.user = await User.findById(decodedData.id)
    next()
}

exports.authorisedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce`, 403)
            )
        }
        next()
    }
}