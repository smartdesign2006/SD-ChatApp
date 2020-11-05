const mock = require("./mock")

module.exports = io => {
    io.on("connect", socket => {
        console.log(`SERVER: New connection detected. Socket ID: ${socket.id}`)

        // Welcome message from server to client connected
        socket.on("login", username => {
            socket.username = username
            let check = mock.find(x => x.name === username);
            console.log(check ? `Rooms list: ${check.rooms.toString()}` : "User has no rooms")
            socket.emit("welcome-message", {
                time: getTime(),
                user: "SERVER",
                msg: `Welcome ${username}`
            })
        })

        // Notify rest of the users
        socket.broadcast.emit("notice-message", "User connected to chat", "Say hello to user")

        // Notify users on disconnect

        socket.on("disconnect", () => {
            io.emit("goodbye-message", "User left the building")
        })



        // Get message from client and send to rest clients
        socket.on("chat-message", msg => {
            // console.log(socket);
            console.log(msg)

            //time when server recieved the message
            socket.broadcast.emit("chat-message", {
                time: getTime(),
                user: socket.username,
                msg
            })
        })
    })

    function getTime() {
        let time = new Date()
        return time.toLocaleTimeString()
    }
}