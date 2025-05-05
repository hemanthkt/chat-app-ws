"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allUser = [];
wss.on("connection", (socket) => {
    allUser.push(socket);
    console.log("user connected");
    userCount = userCount + 1;
    console.log(userCount);
    socket.on("message", (message) => {
        for (let i = 0; i < allUser.length; i++) {
            const s = allUser[i];
            s.send(message.toString() + ": sent from server");
        }
    });
});
