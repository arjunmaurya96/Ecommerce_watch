const productModel = require("../models/ProductModel");
const categoryModel = require("../models/CategoryModel")
const slugify = require("slugify");

const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        // switch (true) {
        //     case !name:
        //         return res.status(500).send({ error: "Name is Required" });
        //     case !description:
        //         return res.status(500).send({ error: "Description is Required" });
        //     case !price:
        //         return res.status(500).send({ error: "Price is Required" });
        //     case !category:
        //         return res.status(500).send({ error: "Category is Required" });
        //     case !quantity:
        //         return res.status(500).send({ error: "Quantity is Required" });
        //     case shipping === undefined:
        //         return res.status(500).send({ error: "Shipping is Required" });
        //     case !req.file:
        //         return res.status(500).send({ error: "Photo is Required" })
        // }
        // console.log("req.file path", req.file.path)
        const product = new productModel({
            name,
            slug: slugify(name),
            description,
            price,
            category,
            quantity,
            shipping,
            photo: req.file?.path || "",
        });

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product,
        });
    } catch (error) {
        console.error("Product create error:", error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error: error.message,
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            // .select("-photo") // Commented out = includes photo
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products,
            counTotal: products.length
        });
    } catch (error) {
        console.error("Error while getting products:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

// const getSingleProduct = async (req, res) => {
//     try {
//         const product = await productModel
//             .findOne({ slug: req.params.slug }) // Fixed this line
//             // .select("-photo")
//             .populate("category");

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Single product fetched successfully",
//             product,
//         });

//     } catch (error) {
//         console.error("Error while getting single product:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch single product",
//             error: error.message,
//         });
//     }
// };

const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .populate("category");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Return product with photo URL
        res.status(200).json({
            success: true,
            message: "Single product fetched successfully",
            product: {
                ...product._doc,
                // photo: `/api/product/photo/${product._id}`, 
            },
        });

    } catch (error) {
        console.error("Error while getting single product:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch single product",
            error: error.message,
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error while deleting product:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message,
        });
    }
};


const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        const productId = req.params.pid;

        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }

        const updatedFields = {
            name: name || existingProduct.name,
            slug: name ? slugify(name) : existingProduct.slug,
            description: description || existingProduct.description,
            price: price || existingProduct.price,
            category: category || existingProduct.category,
            quantity: quantity || existingProduct.quantity,
            shipping: shipping !== undefined ? shipping : existingProduct.shipping,
        };

        // Update photo if new file uploaded
        if (req.file) {
            updatedFields.photo = req.file.path;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            updatedFields,
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {
        console.error("Product update error:", error);
        res.status(500).send({
            success: false,
            message: "Error in updating product",
            error: error.message,
        });
    }
};


// controllers/productController.js


// const productFiltersController = async (req, res) => {
//     try {
//         const { checked = [], radio = [] } = req.body;

//         let args = {};
//         if (checked.length > 0) args.category = { $in: checked };
//         if (radio.length === 2) args.price = { $gte: radio[0], $lte: radio[1] };

//         const products = await productModel.find(args);

//         res.status(200).send({
//             success: true,
//             products,
//         });
//     } catch (error) {
//         console.error("filter error:", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in filtering products",
//             error,
//         });
//     }
// };


const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error whilte filtering Products",
            error
        })

    }
}


// product count 
const productCountController = async (req, res) => {
    try {
        const total = await productModel.estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Error in product count ",
            error,
            success: false
        })
    }
}

// product list base on page 

const productListController = async (req, res) => {
    try {
        const perPage = 3
        const page = req.params.page ? req.params.page : 1
        // const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        const products = await productModel.find({}).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in per page list",
            error
        })
    }
}

// search products 

const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ]
        })
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in search page",
            error

        })
    }
}


const relatedProducts = async (req, res) => {
    try {
        const { pid, cid } = req.params; // get from route parameters, not body
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid } // exclude current product
        })
            .limit(3)
            .populate("category");

        res.status(200).send({
            success: true,
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related products",
            error,
        });
    }
};

const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: "Error while Getting products"

        })

    }
}

module.exports = {
    createProductController,
    getProduct,
    getSingleProduct,
    deleteProductController,
    updateProductController,
    productFiltersController,
    productCountController,
    productListController,
    searchProductController,
    relatedProducts,
    productCategoryController
};