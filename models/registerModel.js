// models/userModel.js

const db = require("../config/db");
const bcrypt = require("bcrypt");

const UserModel = {
	// Register User
	register: async (user) => {
		try {
			const hashedPassword = await bcrypt.hash(user.password, 10);

			const request = db.request();

			const result = await request
				.input("username", db.VarChar, user.username)
				.input("email", db.VarChar, user.email)
				.input("password", db.VarChar, hashedPassword).query(`
          INSERT INTO dbo.tblUsers (username, email, password)
          VALUES (@username, @email, @password)

          SELECT SCOPE_IDENTITY() AS id
        `);

			return result.recordset[0];
		} catch (error) {
			throw error;
		}
	},

	// Login User
	login: async (email, password) => {
		try {
			const request = db.request();

			const result = await request.input("email", db.VarChar, email).query(`
          SELECT * FROM dbo.tblUsers
          WHERE email = @email
        `);

			const user = result.recordset[0];

			if (!user) {
				return null;
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return null;
			}

			return user;
		} catch (error) {
			throw error;
		}
	},

	// Get User By ID
	getById: async (id) => {
		try {
			const request = db.request();

			const result = await request.input("id", db.Int, id).query(`
          SELECT id, username, email
          FROM dbo.tblUsers
          WHERE id = @id
        `);

			return result.recordset[0];
		} catch (error) {
			throw error;
		}
	},
};

module.exports = UserModel;
