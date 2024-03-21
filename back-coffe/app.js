if (process.env.NODE_ENV !== "production") {
	//pakai ini hanya utk local
	require("dotenv").config(); //Install environment env
}

const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const port = 3000;
const cors = require("cors");
const router = require("./routers");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

let users = [];
let messages = [];
const rooms = ["room1", "room2", "room3"];

io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	if (socket.handshake.auth.username) {
		users.push({ id: socket.id, username: socket.handshake.auth.username });
	}

	io.emit("users", users, rooms);

	socket.on("disconnect", () => {
		users = users.filter(({ username }) => {
			return username !== socket.handshake.auth.username;
		});
		io.emit("users", users, rooms);
	});

	// ----- ROOM JOIN -----
	socket.on("message:new", (param) => {
		if (param.target) {
			io.to(param.target).emit("message:info", param);
			socket.emit("message:info", param);
		}
	});
});

module.exports = httpServer;
