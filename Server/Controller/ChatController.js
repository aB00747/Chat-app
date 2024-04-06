const ChatModel = require("../Model/ChatModel");

// createChat
// getChat
// findChat


const createChat = async (req, res) => {
    const { firstID, secondID } = req.body;

    try {
        const chat = await ChatModel.findOne({
            members: { $all: [firstID, secondID] }      // if all elements in the specified array match elements in the document's "members" array then return result query
        })

        if (chat) return res.status(200).json(chat);        // if already exisit then use exisiting chat.

        const newChat = new ChatModel({
            members: [firstID, secondID]
        })

        const response = await newChat.save();

        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

};


const findUserChats = async (req, res) => {
    const userID = req.params.userID;

    try {
        const chats = await ChatModel.find({
            members: { $in: [userID] }  // search in array of users who are member of this chat
        })
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

};


const findChat = async (req, res) => {
    const { firstID, secondID } = req.params;

    try {
        const chat = await ChatModel.find({
            members: { $all: [firstID, secondID] }   // both users should be a member of the chat to get it
        })
        res.status(200).json(chat);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

};

module.exports = { createChat, findUserChats, findChat };