import { WebSocketServer , WebSocket } from "ws";

const wss  = new WebSocketServer({port: 8080})
let userCount = 0
let allUser : WebSocket[] = []

wss.on("connection", (socket) => {
    allUser.push(socket)
console.log("user connected"    );
userCount = userCount + 1
console.log(userCount);

socket.on("message" , (message) => {
    for (let i = 0; i < allUser.length; i++) {
        const s = allUser[i];
        s.send(message.toString() + ": sent from server")
      }
    
  })
})

