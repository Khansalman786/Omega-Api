const InventoryLog = require("../models/inventoryLogModel");

// GET ALL LOGS
exports.getInventoryLogs = async (req, res) => {
	try {
		const logs = await InventoryLog.getAll();

		res.status(200).json({
			success: true,
			data: logs,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// GET SINGLE LOG
exports.getInventoryLogById = async (req, res) => {
	try {
		const log = await InventoryLog.getById(req.params.id);

		if (!log) {
			return res.status(404).json({
				success: false,
				message: "Inventory log not found",
			});
		}

		res.status(200).json({
			success: true,
			data: log,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// CREATE LOG
exports.createInventoryLog = async (req, res) => {
	try {
		await InventoryLog.create(req.body);

		res.status(201).json({
			success: true,
			message: "Inventory log created successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// UPDATE LOG
exports.updateInventoryLog = async (req, res) => {
	try {
		await InventoryLog.update(req.params.id, req.body);

		res.status(200).json({
			success: true,
			message: "Inventory log updated successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// DELETE LOG
exports.deleteInventoryLog = async (req, res) => {
	try {
		await InventoryLog.delete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Inventory log deleted successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};