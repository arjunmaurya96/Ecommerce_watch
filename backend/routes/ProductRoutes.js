const express = require("express");
const { createProductController, getProduct, getSingleProduct, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProducts, productCategoryController } = require("../controllers/ProductController");
const { requireSignIn, isAdmin } = require("../Middleware/authMiddleware");
const upload = require("../Middleware/Multer");

const router = express.Router();

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    upload.single("photo"),
    createProductController
);

// get all product 
router.get("/get-product", getProduct)
// get single product with slug 
router.get("/get-single-product/:slug", getSingleProduct)
// delete Product 
router.delete("/delete-product/:pid", deleteProductController)
// update products 
router.put("/update-product/:pid", upload.single("photo"), updateProductController);
// filter 
router.post("/product-filters", productFiltersController)


// product count 
router.get("/product-count", productCountController)

// /product per page 
router.get("/product-list/:page", productListController)


// search product 
router.get("/search/:keyword", searchProductController)

// similar product 
router.get("/related-product/:pid/:cid", relatedProducts)


// get product by category 
router.get("/product-category/:slug", productCategoryController)

module.exports = router;
