const Product = require("../models/productModel");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.getAll();

		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
	try {
		const product = await Product.getById(req.params.id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		res.status(200).json({
			success: true,
			data: product,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
	try {
		await Product.create(req.body);

		res.status(201).json({
			success: true,
			message: "Product created successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
	try {
		await Product.update(req.params.id, req.body);

		res.status(200).json({
			success: true,
			message: "Product updated successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
	try {
		await Product.delete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};