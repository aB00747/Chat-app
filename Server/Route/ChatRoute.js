const { createChat, findUserChats, findChat } = require("../Controller/ChatController");

const express = require("express")

const router = express.Router();

router.post("/", createChat); 
router.get("/:userID", findUserChats); 
router.get("/find/:firstID/:secondID", findChat); 


module.exports = router