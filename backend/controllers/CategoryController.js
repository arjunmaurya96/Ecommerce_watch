const slugify = require("slugify");
const categoryModel = require("../models/CategoryModel");


// create category 
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ message: "Name is required" });
        }

        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(409).send({
                success: false,
                message: "Category already exists",
            });
        }

        const category = await new categoryModel({
            name,
            slug: slugify(name),
        }).save();

        return res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });

    } catch (error) {
        console.error("Create Category Error:", error);
        return res.status(500).send({
            success: false,
            message: "Error while creating category",
            error: error.message,
        });
    }
};
// update catagory 
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while update category",
            error: error.message,
        });
    }
}

// get all category 
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});

        return res.status(200).send({
            success: true,
            message: "All categories fetched successfully",
            categories,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);

        return res.status(500).send({
            success: false,
            message: "Error while fetching categories",
            error: error.message,
        });
    }
};

// get single category 
const getSingleCategory = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        })

    } catch (error) {
        console.error(error);

        return res.status(500).send({
            success: false,
            message: "Error while single fetching categories",
            error
        });
    }
}

// delete cotegory 

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (error) {
        console.error("Delete Category Error:", error);

        return res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error: error.message,
        });
    }
};


module.exports = {
    createCategoryController,
    updateCategory,
    getAllCategories,
    getSingleCategory,
    deleteCategoryController
};
