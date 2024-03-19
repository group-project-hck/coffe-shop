if (process.env.NODE_ENV !== "production") {
	//pakai ini hanya utk local
	require("dotenv").config(); //Install environment env
}

const cors = require("cors");
const express = require("express");
const router = require("./routers");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

module.exports = app;
