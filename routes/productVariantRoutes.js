const express = require("express");
const router = express.Router();

const productVariantController = require("../controllers/productVariantController");

// GET ALL VARIANTS
router.get("/", productVariantController.getVariants);

// GET SINGLE VARIANT
router.get("/:id", productVariantController.getVariantById);

// CREATE VARIANT
router.post("/", productVariantController.createVariant);

// UPDATE VARIANT
router.put("/:id", productVariantController.updateVariant);

// DELETE VARIANT
router.delete("/:id", productVariantController.deleteVariant);

module.exports = router;


// GET    /api/product-variants
// GET    /api/product-variants/:id
// POST   /api/product-variants
// PUT    /api/product-variants/:id
// DELETE /api/product-variants/:id