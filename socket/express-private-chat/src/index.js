const express = require("express");
const path = require("path");
const app = express();
const crypto = require("crypto");
require("../db");
const { saveMessages } = require("./utils/messages");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
app.use(express.json());

const randomId = () => crypto.randomBytes(8).toString("hex");

app.post("/session", (req, res) => {
  const data = {
    username: req.body.username,
    userID: randomId(),
  };
  res.send(data);
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const userID = socket.handshake.auth.userID;

  if (!username) {
    return next(new Error("Invalid username"));
  }
  socket.username = username;
  socket.id = userID;
  next();
});

let users = [];
io.on("connection", async (socket) => {
  console.log("connected socket");
  let userData = {
    username: socket.username,
    userID: socket.id,
  };
  users.push(userData);
  io.emit("users-data", { users });

  // message from client :  A ==> Server  ===> B
  socket.on("message-to-server", (payload) => {
    io.to(payload.to).emit("message-to-client", payload);
    saveMessages(payload);
  });

  // get message from db
  socket.on("fetch-messages", () => {});

  socket.on("disconnect", () => {});
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
