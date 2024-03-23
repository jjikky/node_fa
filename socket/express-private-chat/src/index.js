const express = require("express");
const path = require("path");
const app = express();
require("../db");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
app.use(express.json());

let users = [];
io.on("connection", async (socket) => {
  console.log("connected socket");
  let userData = {};
  users.push(userData);
  io.emit("users-data", { users });

  // message from client
  socket.on("message-to-server", () => {});

  // get message from db
  socket.on("fetch-messages", () => {});

  socket.on("disconnect", () => {});
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
