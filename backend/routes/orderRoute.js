const express = require("express");
const router = express.Router();
const { newOrder, myOrders, singleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");





router.route("/order/new").post(isAuthenticatedUser,newOrder)

router.route("/order/:id").get(isAuthenticatedUser,singleOrder)

router.route("/orders/me").get(isAuthenticatedUser,myOrders)

router.route("/admin/orders").get(isAuthenticatedUser, authorisedRoles("admin"), getAllOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser, authorisedRoles("admin"), updateOrder)

router.route("/admin/order/:id").delete(isAuthenticatedUser, authorisedRoles("admin"), deleteOrder)


module.exports = router;


module.exports = router;
