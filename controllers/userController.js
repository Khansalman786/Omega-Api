// const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// VALIDATION
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		// FIND USER
		const user = await User.getByEmail(email);

		// CHECK USER
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email",
			});
		}

		// CHECK PASSWORD
		if (user.password !== password) {
			return res.status(401).json({
				success: false,
				message: "Invalid password",
			});
		}

		// GENERATE TOKEN
		// const token = jwt.sign(
		// 	{
		// 		id: user.id,
		// 		email: user.email,
		// 		role: user.role,
		// 	},
		// 	process.env.JWT_SECRET,
		// 	{
		// 		expiresIn: "7d",
		// 	},
		// );

		// REMOVE PASSWORD FROM RESPONSE
		delete user.password;

		// RESPONSE
		res.status(200).json({
			success: true,
			message: "Login successful",
			// token,
			user,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// ======================
// GET ALL USERS
// ======================
exports.getUsers = async (req, res) => {
	try {
		const users = await User.getAll();

		res.status(200).json({
			success: true,
			count: users.length,
			data: users,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// ======================
// GET USER BY ID
// ======================
exports.getUserById = async (req, res) => {
	try {
		const user = await User.getById(req.params.id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// ======================
// CREATE USER
// ======================
exports.createUser = async (req, res) => {
	try {
		const { full_name, email, phone, password, role } = req.body;

		// VALIDATION
		if (!full_name || !email || !phone || !password) {
			return res.status(400).json({
				success: false,
				message: "All required fields are required",
			});
		}

		await User.create({
			full_name,
			email,
			phone,
			password,
			role,
		});

		res.status(201).json({
			success: true,
			message: "User created successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// ======================
// UPDATE USER
// ======================
exports.updateUser = async (req, res) => {
	try {
		const { full_name, email, phone, role, is_active } = req.body;

		// CHECK USER EXISTS
		const existingUser = await User.getById(req.params.id);

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		await User.update(req.params.id, {
			full_name,
			email,
			phone,
			role,
			is_active,
		});

		res.status(200).json({
			success: true,
			message: "User updated successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

// ======================
// DELETE USER
// ======================
exports.deleteUser = async (req, res) => {
	try {
		// CHECK USER EXISTS
		const existingUser = await User.getById(req.params.id);

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		await User.delete(req.params.id);

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};
