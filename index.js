const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const keys = require("./config/keys");

// var forms = multer();

mongoose.connect(keys.mUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
// app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json

require("./models/user");
require("./routes/user")(app);

if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static("client/build"));

	//Express will server index.html if any requested route is not defined in the server
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
