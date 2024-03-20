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

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  
  // handshake
  console.log(socket.handshake.auth);
  if(socket.handshake.auth.username) {
    users.push(socket.handshake.auth.username)
  }

  // emit server to all client
  socket.emit("message:info", messages)

  // send users event to all client
  io.emit("users", users)

  socket.on("message:new", (param) => {
    messages.push(param);
    io.emit("message:info", param)
  })

  socket.on("disconnect", () => {
    users = users.filter(user => {
      return user !== socket.handshake.auth.username
    })
    io.emit('users', users)
  })
});


httpServer.listen(port, () => {
  console.log("Server is running on port", port)
})

module.exports = app;
