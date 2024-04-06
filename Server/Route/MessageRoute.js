const { createMessage, getMessages } = require("../Controller/MessageController");

const express = require("express")

const router = express.Router();

router.post("/", createMessage); 
router.get("/:chatID", getMessages); 

module.exports = router