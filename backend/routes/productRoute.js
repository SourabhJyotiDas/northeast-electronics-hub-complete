const express = require("express");
const {getallProducts,createProduct,UpdateProduct,deleteProduct,getProductsDetails,createProductReview,deleteReview,getAllProductReview, getAdminProducts} = require("../controllers/productController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");
const router = express.Router();

//Our All Routes 

router.route("/products").get(getallProducts)

router.route("/admin/product/new").post(isAuthenticatedUser, authorisedRoles("admin"), createProduct)

router.route("/admin/product/:id").put(isAuthenticatedUser, authorisedRoles("admin"), UpdateProduct)

router.route("/admin/product/:id").delete(isAuthenticatedUser, authorisedRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductsDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview)

router.route("/reviews").get(getAllProductReview)

router.route("/reviews").delete(isAuthenticatedUser, deleteReview)


router.route("/admin/products").get(isAuthenticatedUser, authorisedRoles("admin"), getAdminProducts)


module.exports = router