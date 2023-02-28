const Order = require("../models/orderModel");
const Product = require("../models/ProductModel");
// const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");



// create NEw Order
exports.newOrder = async function (req, res, next) {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
}


// get Single Order
exports.singleOrder = async function (req, res, next) {
    try {
        const order = await Order.findById(req.params.id) // populate is not working .populate("user", "name email")
        // console.log(order);
        if (!order) {
            return next(new ErrorHandler("No Order found with this id", 404))
        }
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        return next(new ErrorHandler("Product not found", 404))
    }
}


// get logged in user Orders
exports.myOrders = async function (req, res, next) {
    const orders= await Order.find({ user: req.user._id })
    res.status(200).json({
        success: true,
        orders
    })
}



// get all Orders -- Admin
exports.getAllOrders = async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((element) => {
        totalAmount += element.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
};


// update Orders  status -- Admin
exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (element) => {
            await updateStock(element.product, element.quantity);
        });
    }
    
    order.orderStatus = req.body.status;

  
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
};

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}



// delete Order -- Admin
exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
};












