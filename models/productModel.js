const { sql, poolPromise } = require("../config/db");

const TABLE_NAME = "Products";

const Product = {
	// GET ALL PRODUCTS
	getAll: async () => {
		const pool = await poolPromise;

		const result = await pool.request().query(`
			SELECT *
			FROM ${TABLE_NAME}
			ORDER BY id DESC
		`);

		return result.recordset;
	},

	// GET PRODUCT BY ID
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

	// CREATE PRODUCT
	create: async (product) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("title", sql.VarChar(255), product.title)
			.input("slug", sql.VarChar(255), product.slug)
			.input("price", sql.Decimal(10, 2), product.price)
			.input(
				"discount_price",
				sql.Decimal(10, 2),
				product.discount_price || null
			)
			.input("stock", sql.Int, product.stock || 0)
			.input("category_id", sql.Int, product.category_id || null)
			.input("description", sql.Text, product.description || null)
			.input("images", sql.Text, product.images || null)
			.query(`
				INSERT INTO ${TABLE_NAME}
				(
					title,
					slug,
					price,
					discount_price,
					stock,
					category_id,
					description,
					images,
					created_at,
					updated_at
				)
				VALUES
				(
					@title,
					@slug,
					@price,
					@discount_price,
					@stock,
					@category_id,
					@description,
					@images,
					GETDATE(),
					GETDATE()
				)
			`);

		return result;
	},

	// UPDATE PRODUCT
	update: async (id, product) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.input("title", sql.VarChar(255), product.title)
			.input("slug", sql.VarChar(255), product.slug)
			.input("price", sql.Decimal(10, 2), product.price)
			.input(
				"discount_price",
				sql.Decimal(10, 2),
				product.discount_price || null
			)
			.input("stock", sql.Int, product.stock)
			.input("category_id", sql.Int, product.category_id || null)
			.input("description", sql.Text, product.description || null)
			.input("images", sql.Text, product.images || null)
			.query(`
				UPDATE ${TABLE_NAME}
				SET
					title = @title,
					slug = @slug,
					price = @price,
					discount_price = @discount_price,
					stock = @stock,
					category_id = @category_id,
					description = @description,
					images = @images,
					updated_at = GETDATE()
				WHERE id = @id
			`);

		return result;
	},

	// DELETE PRODUCT
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

module.exports = Product;