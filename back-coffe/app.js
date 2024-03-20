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
console.log(users);
let messages = [];
console.log(messages);

io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	console.log(socket.handshake.auth);
	if (socket.handshake.auth.username) {
		users.push({ id: socket.id, username: socket.handshake.auth.username });
	}

	io.emit("users", users);

	socket.on("message:new", (param) => {
		messages.push(param);
		if (param.target) {
			socket.emit("message:info", messages);
			io.to(param.target).emit("message:info", param);
			io.to(param.id).emit("message:info", param);
		}
	});

	socket.on("disconnect", () => {
		users = users.filter(({ username }) => {
			return username !== socket.handshake.auth.username;
		});
		io.emit("users", users);
	});

	// ----- ROOM JOIN -----
	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`user with ID: ${socket.id} join room: ${data}`);
	});
});

module.exports = httpServer;
