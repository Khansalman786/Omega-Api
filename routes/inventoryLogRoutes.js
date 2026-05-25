const express = require("express");
const router = express.Router();

const inventoryLogController = require("../controllers/inventoryLogController");

// GET ALL LOGS
router.get("/", inventoryLogController.getInventoryLogs);

// GET SINGLE LOG
router.get("/:id", inventoryLogController.getInventoryLogById);

// CREATE LOG
router.post("/", inventoryLogController.createInventoryLog);

// UPDATE LOG
router.put("/:id", inventoryLogController.updateInventoryLog);

// DELETE LOG
router.delete("/:id", inventoryLogController.deleteInventoryLog);

module.exports = router;

// GET    /api/inventory-logs
// GET    /api/inventory-logs/:id
// POST   /api/inventory-logs
// PUT    /api/inventory-logs/:id
// DELETE /api/inventory-logs/:id
