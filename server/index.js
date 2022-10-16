const PORT = 3001;

const io = require("socket.io")(PORT, {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.1.7:3000"],
        methods: ["GET", "POST"],
    },
})


io.on("connection", socket => {
    console.log("Connected")
    socket.on("send-changes", delta => {
        socket.broadcast.emit("receive-changes", delta)
    })
})