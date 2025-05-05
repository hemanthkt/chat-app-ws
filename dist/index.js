"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
let allSockets = [];
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.type == "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
            console.log(allSockets);
        }
        let currentUserRoom = null;
        if (parsedMessage.type == "chat") {
            currentUserRoom = (_a = allSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            console.log(currentUserRoom);
        }
        for (let i = 0; i < allSockets.length; i++) {
            if (allSockets[i].room == currentUserRoom) {
                allSockets[i].socket.send(parsedMessage.payload.message);
            }
        }
    });
});
