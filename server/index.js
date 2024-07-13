import express from 'express'
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    // limiting access
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    // Upon connection - only to user
    // hence socket.emit, not io.emit
    // io.emit will send to everyone, socket.emit will send to specific socket(user)
    socket.emit('message', "Welcome to Chat App!")

    // Upon connection - to everyone connected
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} connected`)

    // Listening for a message event
    socket.on('message', data => {
        console.log(data)
        //sending message and userid back to log; (0,5) is the first 5 chars of the string
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })

    // when users disconnects - to all others
    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} disconnected`)
    })

    // display message when typing
    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)
    })
})
