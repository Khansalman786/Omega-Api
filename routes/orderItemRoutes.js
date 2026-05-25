const express = require("express");
const router = express.Router();

const orderItemController = require("../controllers/orderItemController");

// GET ALL ORDER ITEMS
router.get("/", orderItemController.getOrderItems);

// GET SINGLE ORDER ITEM
router.get("/:id", orderItemController.getOrderItemById);

// CREATE ORDER ITEM
router.post("/", orderItemController.createOrderItem);

// UPDATE ORDER ITEM
router.put("/:id", orderItemController.updateOrderItem);

// DELETE ORDER ITEM
router.delete("/:id", orderItemController.deleteOrderItem);

module.exports = router;

// GET    /api/order-items
// GET    /api/order-items/:id
// POST   /api/order-items
// PUT    /api/order-items/:id
// DELETE /api/order-items/:id
