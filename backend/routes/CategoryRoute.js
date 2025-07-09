const { createCategoryController, updateCategory, getAllCategories, getSingleCategory, deleteCategoryController } = require("../controllers/CategoryController");
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware')

const router = require("express").Router()


router.post("/create-category", requireSignIn, isAdmin, createCategoryController)
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory)
router.get("/get-category", getAllCategories)
router.get("/get-singlecategory/:slug", getSingleCategory)
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)

module.exports = router;