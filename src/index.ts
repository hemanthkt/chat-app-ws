import { WebSocketServer, WebSocket } from "ws"

interface User {
    socket: WebSocket;
    room: string
}

let allSockets:User[] = [];

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (socket) => {

    socket.on("message" , (message) => {
        const parsedMessage = JSON.parse(message as unknown as string)
console.log(parsedMessage);

        if(parsedMessage.type == "join"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })

            console.log(allSockets);
            
        }

        let currentUserRoom = null

        if(parsedMessage.type == "chat"){
           
             currentUserRoom = allSockets.find((x) => x.socket == socket)?.room
             console.log(currentUserRoom);
             
        }
    
    for (let i = 0; i < allSockets.length; i++) {
       if (allSockets[i].room == currentUserRoom) {
          allSockets[i].socket.send(parsedMessage.payload.message)
       } 
        
    }   
        
    })
    
    
})
