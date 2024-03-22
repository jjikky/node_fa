const ws = new WebSocket("ws://localhost:7071/ws");

ws.onmessage = (WebSocketMessage) => {
  console.log(WebSocketMessage);
  console.log(WebSocketMessage.data);
};

document.body.onmousemove = (evt) => {
  const messageBody = {
    x: evt.clientX,
    y: evt.clientY,
  };
  ws.send(JSON.stringify(messageBody));
};
