const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
// const cloudinary = require("cloudinary");








// create product --- Admin

exports.createProduct =catchAsyncErrors(async(req, res, next)=>{
    
    const product= await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

// Get all Product
exports.getAllProducts =catchAsyncErrors(async (req, res)=>{
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    
    res.status(200).json({
        success:true,
        products,
        productsCount
    })
})

// update Product --- Admin
exports.updateProduct =catchAsyncErrors( async(req, res, next)=>{

    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));


    }

    
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(201).json({
        success:true,
        product
    })
});


// Delete Product -- ADMIN

exports.deleteProduct =catchAsyncErrors(async (req, res)=>{

    const deletedProduct = await Product.findById(req.params.id);

    if (!deletedProduct) {
      // Product with the given ID not found
      return next(new ErrorHandler("Product Not Found",404));

    }
    await deletedProduct.deleteOne();
    return res.status(201).json({
         success: true,
         message: "Product Deleted Successfulyy" 
        });
});

// Get Product Details
exports.getProductDetails =catchAsyncErrors( async (req, res,next)=>{

    const product = await Product.findById(req.params.id);

    if (!product) {
    //    Product with the given ID not found
    //   return res.status(500).json(
    //     { success: false, 
    //         message: "Product not found." }
    //   );

    // after using error handler
        return next(new ErrorHandler("Product Not Found",404));
    }
    
    return res.status(201).json({
         success: true,
         product 
        });
});







