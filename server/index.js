import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()

const io = new Server(httpServer,{
    // limiting access
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : 
        ["http://127.0.0.1:5500","http://localhost:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(data)
        //sending messgae and userid back to log; (0,5) is the first 5 chacs of the string
        io.emit('message',`${socket.id.substring(0,5)}:${data}`)
    })
})


httpServer.listen(3500,() => console.log('listening on port 3500'))