const express = require("express");

const app = express();

const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { addUser, getUsersInRoom } = require("./utils/users");
const { generateMessage } = require("./utils/messages");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket", socket.id);

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) return callback(error);
    socket.join(user.room);

    // enter message
    socket.emit(
      "message",
      generateMessage("Admin", `${user.room}방에 오신 걸 환영합니다.`)
    );
    // 정보를 보낸이를 제외하고 데이터를 모두에게 보내는 명령어
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("", `${user.username}가 방에 참여했습니다.`)
      );

    // data of users in room and rom name
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
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
