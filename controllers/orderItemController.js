const OrderItem = require("../models/orderItemModel");

// GET ALL ORDER ITEMS
exports.getOrderItems = async (req, res) => {
	try {
		const items = await OrderItem.getAll();

		res.status(200).json({
			success: true,
			data: items,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// GET SINGLE ORDER ITEM
exports.getOrderItemById = async (req, res) => {
	try {
		const item = await OrderItem.getById(req.params.id);

		if (!item) {
			return res.status(404).json({
				success: false,
				message: "Order item not found",
			});
		}

		res.status(200).json({
			success: true,
			data: item,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// CREATE ORDER ITEM
exports.createOrderItem = async (req, res) => {
	try {
		await OrderItem.create(req.body);

		res.status(201).json({
			success: true,
			message: "Order item created successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// UPDATE ORDER ITEM
exports.updateOrderItem = async (req, res) => {
	try {
		await OrderItem.update(req.params.id, req.body);

		res.status(200).json({
			success: true,
			message: "Order item updated successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// DELETE ORDER ITEM
exports.deleteOrderItem = async (req, res) => {
	try {
		await OrderItem.delete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Order item deleted successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};
