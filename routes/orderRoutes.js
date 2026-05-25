const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// GET ALL ORDERS
router.get("/", orderController.getOrders);

// GET SINGLE ORDER
router.get("/:id", orderController.getOrderById);

// CREATE ORDER
router.post("/", orderController.createOrder);

// UPDATE ORDER
router.put("/:id", orderController.updateOrder);

// DELETE ORDER
router.delete("/:id", orderController.deleteOrder);

module.exports = router;

// GET    /api/orders
// GET    /api/orders/:id
// POST   /api/orders
// PUT    /api/orders/:id
// DELETE /api/orders/:id
