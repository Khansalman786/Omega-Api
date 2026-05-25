const { sql, poolPromise } = require("../config/db");

const TABLE_NAME = "ProductVariants";

const ProductVariant = {
	// GET ALL VARIANTS
	getAll: async () => {
		const pool = await poolPromise;

		const result = await pool.request().query(`
			SELECT *
			FROM ${TABLE_NAME}
			ORDER BY id DESC
		`);

		return result.recordset;
	},

	// GET VARIANT BY ID
	getById: async (id) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.query(`
				SELECT *
				FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result.recordset[0];
	},

	// CREATE VARIANT
	create: async (variant) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("product_id", sql.Int, variant.product_id)
			.input("size_id", sql.Int, variant.size_id || null)
			.input("color_id", sql.Int, variant.color_id || null)
			.input("stock", sql.Int, variant.stock || 0)
			.input("price", sql.Decimal(10, 2), variant.price)
			.input("image", sql.Text, variant.image || null)
			.input("sku", sql.VarChar(100), variant.sku)
			.query(`
				INSERT INTO ${TABLE_NAME}
				(
					product_id,
					size_id,
					color_id,
					stock,
					price,
					image,
					sku,
					created_at,
					updated_at
				)
				VALUES
				(
					@product_id,
					@size_id,
					@color_id,
					@stock,
					@price,
					@image,
					@sku,
					GETDATE(),
					GETDATE()
				)
			`);

		return result;
	},

	// UPDATE VARIANT
	update: async (id, variant) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.input("product_id", sql.Int, variant.product_id)
			.input("size_id", sql.Int, variant.size_id || null)
			.input("color_id", sql.Int, variant.color_id || null)
			.input("stock", sql.Int, variant.stock)
			.input("price", sql.Decimal(10, 2), variant.price)
			.input("image", sql.Text, variant.image || null)
			.input("sku", sql.VarChar(100), variant.sku)
			.query(`
				UPDATE ${TABLE_NAME}
				SET
					product_id = @product_id,
					size_id = @size_id,
					color_id = @color_id,
					stock = @stock,
					price = @price,
					image = @image,
					sku = @sku,
					updated_at = GETDATE()
				WHERE id = @id
			`);

		return result;
	},

	// DELETE VARIANT
	delete: async (id) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.query(`
				DELETE FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result;
	},
};

module.exports = ProductVariant;