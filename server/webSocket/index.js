const WebSocket = require("ws");
const wssPort = 4000;
const wss = new WebSocket.Server({ port: parseInt(wssPort) });

wss.on("listening", () => {
  console.log(`Websocket is running at ws://localhost:${wssPort}`);
});

const sendWebSocketMessage = (message) => {
  console.log(message);
  wss.clients.forEach(async (client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
};

module.exports = sendWebSocketMessage;
