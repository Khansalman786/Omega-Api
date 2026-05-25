const ProductVariant = require("../models/productVariantModel");

// GET ALL VARIANTS
exports.getVariants = async (req, res) => {
	try {
		const variants = await ProductVariant.getAll();

		res.status(200).json({
			success: true,
			data: variants,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// GET SINGLE VARIANT
exports.getVariantById = async (req, res) => {
	try {
		const variant = await ProductVariant.getById(req.params.id);

		if (!variant) {
			return res.status(404).json({
				success: false,
				message: "Variant not found",
			});
		}

		res.status(200).json({
			success: true,
			data: variant,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// CREATE VARIANT
exports.createVariant = async (req, res) => {
	try {
		await ProductVariant.create(req.body);

		res.status(201).json({
			success: true,
			message: "Variant created successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// UPDATE VARIANT
exports.updateVariant = async (req, res) => {
	try {
		await ProductVariant.update(req.params.id, req.body);

		res.status(200).json({
			success: true,
			message: "Variant updated successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// DELETE VARIANT
exports.deleteVariant = async (req, res) => {
	try {
		await ProductVariant.delete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Variant deleted successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};