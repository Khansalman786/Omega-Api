const { sql, poolPromise } = require("../config/db");

const TABLE_NAME = "InventoryLogs";

const InventoryLog = {
	// GET ALL LOGS
	getAll: async () => {
		const pool = await poolPromise;

		const result = await pool.request().query(`
			SELECT *
			FROM ${TABLE_NAME}
			ORDER BY id DESC
		`);

		return result.recordset;
	},

	// GET LOG BY ID
	getById: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				SELECT *
				FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result.recordset[0];
	},

	// CREATE LOG
	create: async (log) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("product_id", sql.Int, log.product_id)
			.input("variant_id", sql.Int, log.variant_id || null)
			.input("old_stock", sql.Int, log.old_stock)
			.input("new_stock", sql.Int, log.new_stock)
			.input("action", sql.VarChar(50), log.action).query(`
				INSERT INTO ${TABLE_NAME}
				(
					product_id,
					variant_id,
					old_stock,
					new_stock,
					action,
					created_at
				)
				VALUES
				(
					@product_id,
					@variant_id,
					@old_stock,
					@new_stock,
					@action,
					GETDATE()
				)
			`);

		return result;
	},

	// UPDATE LOG
	update: async (id, log) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.input("product_id", sql.Int, log.product_id)
			.input("variant_id", sql.Int, log.variant_id || null)
			.input("old_stock", sql.Int, log.old_stock)
			.input("new_stock", sql.Int, log.new_stock)
			.input("action", sql.VarChar(50), log.action).query(`
				UPDATE ${TABLE_NAME}
				SET
					product_id = @product_id,
					variant_id = @variant_id,
					old_stock = @old_stock,
					new_stock = @new_stock,
					action = @action
				WHERE id = @id
			`);

		return result;
	},

	// DELETE LOG
	delete: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				DELETE FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result;
	},
};

module.exports = InventoryLog;
