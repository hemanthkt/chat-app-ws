"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
wss.on("connection", (socket) => {
    console.log("user connected");
    userCount = userCount + 1;
    console.log(userCount);
    socket.on("message", (message) => {
        console.log("Server: " + message);
        socket.send("Client: " + message);
    });
});
