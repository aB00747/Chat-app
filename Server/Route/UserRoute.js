const express = require("express");
const { registerUser } = require("../Controller/UserController");

const router = express.Router();

// router.post("/register", (req, res) => {  // to test this is working post -> get (http://localhost:5000/api/users/register)
//     res.send("Register is working !!");
// })
router.post("/register", registerUser)

module.exports = router