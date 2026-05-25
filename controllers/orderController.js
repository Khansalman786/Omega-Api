const Order = require("../models/orderModel");

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
	try {
		const orders = await Order.getAll();

		res.status(200).json({
			success: true,
			data: orders,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// GET SINGLE ORDER
exports.getOrderById = async (req, res) => {
	try {
		const order = await Order.getById(req.params.id);

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found",
			});
		}

		res.status(200).json({
			success: true,
			data: order,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// CREATE ORDER
exports.createOrder = async (req, res) => {
	try {
		await Order.create(req.body);

		res.status(201).json({
			success: true,
			message: "Order created successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
	try {
		await Order.update(req.params.id, req.body);

		res.status(200).json({
			success: true,
			message: "Order updated successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
	try {
		await Order.delete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Order deleted successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};
