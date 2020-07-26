const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const User = mongoose.model("users");

const DIR = "./client/public/";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname
			.toLowerCase()
			.split(" ")
			.join("-");
		cb(null, "IMAGE-" + Date.now() + "-" + fileName);
	},
});

var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
		}
	},
});

module.exports = (app) => {
	app.get("/rrt", async (req, res) => {
		res.status(200).json("listing here");
	});

	app.post("/api/add_user", upload.single("profileImg"), async (req, res) => {
		const url = req.protocol + "://" + req.get("host");
		let profileImg = url + "/public/" + req.file.filename;
		const { first_name, last_name, subject } = req.body;
		const user = new User({
			first_name,
			last_name,
			subject,
			profileImg: {
				data: fs.readFileSync(
					path.join(__dirname + "/../client/public/" + req.file.filename)
				),
				contentType: "image/png",
			},
		});
		try {
			let savedUser = await user.save();
			// console.log(savedUser);
		} catch (err) {
			console.log(err);
		}
		res.status(200).json("success");
	});

	app.post(
		"/api/update_user",
		upload.single("profileImg"),
		async (req, res) => {
			// console.log(typeof req.file);
			if (typeof req.file !== "undefined") {
				const url = req.protocol + "://" + req.get("host");
				let profileImg = url + "/public/" + req.file.filename;
			}

			const { first_name, last_name, subject, userId } = req.body;
			let update;
			if (typeof req.file == "undefined") {
				// const user = await User.find({ _id: userId }, { filename: 1 });
				// profileImgD = {
				// 	data: fs.readFileSync(
				// 		path.join(__dirname + "/../client/public/" + user.filename)
				// 	),
				// 	contentType: "image/png",
				// };
				update = {
					first_name,
					last_name,
					subject,
				};
			} else {
				profileImgD = {
					data: fs.readFileSync(
						path.join(__dirname + "/../client/public/" + req.file.filename)
					),
					contentType: "image/png",
				};
				update = {
					first_name,
					last_name,
					subject,
					profileImg: profileImgD,
				};
			}

			const filter = { id: userId };

			try {
				let savedUser = await User.findOneAndUpdate(filter, update, {
					new: true,
					useFindAndModify: false,
				});
				// console.log(savedUser);
			} catch (err) {
				console.log(err);
			}
			res.status(200).json("req.body");
		}
	);

	app.get("/api/get_users", async (req, res) => {
		const userLists = await User.find({});
		return res.status(200).json(userLists);
	});

	app.get("/api/get_user", async (req, res) => {
		const user = await User.find(
			{ _id: req.query.id },
			{ first_name: 1, last_name: 1, subject: 1 }
		);
		return res.status(200).json(user);
	});

	app.delete("/api/delete_user", async (req, res) => {
		const user = await User.findByIdAndDelete(req.body.userId);
		return res.status(200).json(user);
	});
};
