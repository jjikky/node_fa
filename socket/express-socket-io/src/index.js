const express = require("express");

const app = express();

const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { addUser } = require("./utils/users");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket", socket.id);

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) return callback(error);
    socket.join(user.room);
  });

  socket.on("sendMessage", () => {});
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

const port = 4000;
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
