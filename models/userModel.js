const { sql, poolPromise } = require("../config/db");

const TABLE_NAME = "Users";

const User = {
	// Login - Get user by email
	getByEmail: async (email) => {
		const pool = await poolPromise;

		const result = await pool.request().input("email", sql.VarChar(100), email)
			.query(`
			SELECT *
			FROM ${TABLE_NAME}
			WHERE email = @email
		`);

		return result.recordset[0];
	},

	// GET ALL USERS
	getAll: async () => {
		const pool = await poolPromise;

		const result = await pool.request().query(`
			SELECT *
			FROM ${TABLE_NAME}
			ORDER BY id DESC
		`);

		return result.recordset;
	},

	// GET USER BY ID
	getById: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				SELECT *
				FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result.recordset[0];
	},

	// CREATE USER
	create: async (user) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("full_name", sql.VarChar(100), user.full_name)
			.input("email", sql.VarChar(100), user.email)
			.input("phone", sql.VarChar(20), user.phone)
			.input("password", sql.VarChar(255), user.password)
			.input("role", sql.VarChar(20), user.role || "customer").query(`
				INSERT INTO ${TABLE_NAME}
				(
					full_name,
					email,
					phone,
					password,
					role,
					is_active,
					created_at,
					updated_at
				)
				VALUES
				(
					@full_name,
					@email,
					@phone,
					@password,
					@role,
					1,
					GETDATE(),
					GETDATE()
				)
			`);

		return result;
	},

	// UPDATE USER
	update: async (id, user) => {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.input("full_name", sql.VarChar(100), user.full_name)
			.input("email", sql.VarChar(100), user.email)
			.input("phone", sql.VarChar(20), user.phone)
			.input("role", sql.VarChar(20), user.role)
			.input("is_active", sql.Bit, user.is_active).query(`
				UPDATE ${TABLE_NAME}
				SET
					full_name = @full_name,
					email = @email,
					phone = @phone,
					role = @role,
					is_active = @is_active,
					updated_at = GETDATE()
				WHERE id = @id
			`);

		return result;
	},

	// DELETE USER
	delete: async (id) => {
		const pool = await poolPromise;

		const result = await pool.request().input("id", sql.Int, id).query(`
				DELETE FROM ${TABLE_NAME}
				WHERE id = @id
			`);

		return result;
	},
};

module.exports = User;
