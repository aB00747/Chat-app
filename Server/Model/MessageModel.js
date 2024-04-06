const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatID: String,  // get message for chats
    senderID: String, // who send message
    text: String  // what is the message
},
{
    timestamps: true
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;