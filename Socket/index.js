// Copy this from socket.io -> Initialization section from documentation
const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" }); // client
let onlineUsers = [];

io.on("connection", (socket) => {

    //  listen to connection event
    socket.on("addNewUser", (userID) => {
        !onlineUsers.some(user => user.userID === userID) &&
            onlineUsers.push({
                userID,
                socketID: socket.id
            });

        io.emit("getOnlineUsers", onlineUsers);
    });

    //add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userID === message.recipientID);

        if (user) {
            io.to(user.socketID).emit("getMessage", message);
            io.to(user.socketID).emit("getNotification", {
                message,
                senderID: message.senderID,
                isRead: false,
                date: new Date()
            });
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketID !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    })
});

io.listen(3000);