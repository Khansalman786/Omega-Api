const { sql, poolPromise } = require("../config/db");

const TABLE_NAME = "Orders";

const Order = {
	// GET ALL ORDERS
	getAll: async () => {
		const pool = await poolPromise;

		const result = await pool.request().query(`
			SELECT *
			FROM ${TABLE_NAME}
			ORDER BY id DESC
		`);

		return result.recordset;
	},

	// GET ORDER BY ID
	getById: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				SELECT *
				FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result.recordset[0];
	},

	// CREATE ORDER
	create: async (order) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("customer_id", sql.Int, order.customer_id)
			.input("order_number", sql.VarChar(100), order.order_number)
			.input("total_amount", sql.Decimal(10, 2), order.total_amount)
			.input(
				"payment_status",
				sql.VarChar(50),
				order.payment_status || "pending",
			)
			.input("order_status", sql.VarChar(50), order.order_status || "pending")
			.input("shipping_address_id", sql.Int, order.shipping_address_id || null)
			.input("payment_method_id", sql.Int, order.payment_method_id || null)
			.query(`
				INSERT INTO ${TABLE_NAME}
				(
					customer_id,
					order_number,
					total_amount,
					payment_status,
					order_status,
					shipping_address_id,
					payment_method_id,
					created_at
				)
				VALUES
				(
					@customer_id,
					@order_number,
					@total_amount,
					@payment_status,
					@order_status,
					@shipping_address_id,
					@payment_method_id,
					GETDATE()
				)
			`);

		return result;
	},

	// UPDATE ORDER
	update: async (id, order) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.input("customer_id", sql.Int, order.customer_id)
			.input("order_number", sql.VarChar(100), order.order_number)
			.input("total_amount", sql.Decimal(10, 2), order.total_amount)
			.input("payment_status", sql.VarChar(50), order.payment_status)
			.input("order_status", sql.VarChar(50), order.order_status)
			.input("shipping_address_id", sql.Int, order.shipping_address_id || null)
			.input("payment_method_id", sql.Int, order.payment_method_id || null)
			.query(`
				UPDATE ${TABLE_NAME}
				SET
					customer_id = @customer_id,
					order_number = @order_number,
					total_amount = @total_amount,
					payment_status = @payment_status,
					order_status = @order_status,
					shipping_address_id = @shipping_address_id,
					payment_method_id = @payment_method_id
				WHERE id = @id
			`);

		return result;
	},

	// DELETE ORDER
	delete: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				DELETE FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result;
	},
};

module.exports = Order;
