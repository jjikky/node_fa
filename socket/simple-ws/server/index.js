const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 7071 });
wss.on("connection", (ws) => {
  ws.send("connected");
  ws.on("message", (messageFromClient) => {
    const message = JSON.parse(messageFromClient);
    console.log(message);
  });
});
