const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchemas = new Schema({
	first_name: String,
	last_name: String,
	// class_name: { type: Number, default: 1 },
	// section: String,
	subject: String,
	filename: String,
	// profileImg: { type: String },
	profileImg: {
		data: Buffer,
		contentType: String,
	},
	// address: String,
	// contact: { type: Number },
});

// adding model name
mongoose.model("users", userSchemas);
