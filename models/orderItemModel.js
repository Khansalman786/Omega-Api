const { sql, poolPromise } = require("../config/db");

const TABLE_NAME = "OrderItems";

const OrderItem = {
	// GET ALL ORDER ITEMS
	getAll: async () => {
		const pool = await poolPromise;

		const result = await pool.request().query(`
			SELECT *
			FROM ${TABLE_NAME}
			ORDER BY id DESC
		`);

		return result.recordset;
	},

	// GET ORDER ITEM BY ID
	getById: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				SELECT *
				FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result.recordset[0];
	},

	// CREATE ORDER ITEM
	create: async (item) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("order_id", sql.Int, item.order_id)
			.input("product_id", sql.Int, item.product_id)
			.input("variant_id", sql.Int, item.variant_id || null)
			.input("quantity", sql.Int, item.quantity)
			.input("price", sql.Decimal(10, 2), item.price)
			.input("subtotal", sql.Decimal(10, 2), item.subtotal).query(`
				INSERT INTO ${TABLE_NAME}
				(
					order_id,
					product_id,
					variant_id,
					quantity,
					price,
					subtotal,
					created_at
				)
				VALUES
				(
					@order_id,
					@product_id,
					@variant_id,
					@quantity,
					@price,
					@subtotal,
					GETDATE()
				)
			`);

		return result;
	},

	// UPDATE ORDER ITEM
	update: async (id, item) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.input("order_id", sql.Int, item.order_id)
			.input("product_id", sql.Int, item.product_id)
			.input("variant_id", sql.Int, item.variant_id || null)
			.input("quantity", sql.Int, item.quantity)
			.input("price", sql.Decimal(10, 2), item.price)
			.input("subtotal", sql.Decimal(10, 2), item.subtotal).query(`
				UPDATE ${TABLE_NAME}
				SET
					order_id = @order_id,
					product_id = @product_id,
					variant_id = @variant_id,
					quantity = @quantity,
					price = @price,
					subtotal = @subtotal
				WHERE id = @id
			`);

		return result;
	},

	// DELETE ORDER ITEM
	delete: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				DELETE FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result;
	},
};

module.exports = OrderItem;
