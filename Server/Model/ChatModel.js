const mangoose = require("mongoose");

const chatSchema = new mangoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
)

const ChatModel = mangoose.model("Chat", chatSchema);

module.exports = ChatModel;