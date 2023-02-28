const Product = require("../models/ProductModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");



// Create Product -- Admin
exports.createProduct = async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "E-com products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  };
  


// get All Products
exports.getallProducts = async (req, res) => {

    const resultPerPage = 15;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    let newProduct = await apiFeature.query;
    res.status(200).json({
        success: true,
        newProduct,
        productCount,
        resultPerPage,
    })
}


exports.getAdminProducts = async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
};


// Update Product ----Admin only
exports.UpdateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
          return next(new ErrorHandler("Product not found", 404));
        }
        // Images Start Here
        let images = [];
      
        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
      
        if (images !== undefined) {
          // Deleting Images From Cloudinary
          for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }
      
          const imagesLinks = [];
      
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
            });
      
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
      
          req.body.images = imagesLinks;
        }
      
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
      
        res.status(200).json({
          success: true,
          product,
        });
    } catch (error) {
        return next(new ErrorHandler("Product not found", 404))
    }
}


// Delete Product ----Admin only
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        await product.remove();

        res.status(200).json({
            success: true,
            message: "Product Delete Successfully",
        });
    } catch (error) {
        return next(new ErrorHandler("Product not found", 404))
    }
}

// Get Single/Product details
exports.getProductsDetails = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return next(new ErrorHandler("Product not found", 404))
    }
}


// create new Review or Update the Review
exports.createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
};

// Get all Reviews of a single product

exports.getAllProductReview = async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
}


// Delete Review
exports.deleteReview = async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
};