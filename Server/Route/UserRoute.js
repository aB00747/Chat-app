const express = require("express");
const { registerUser, loginUser, findUser } = require("../Controller/UserController");

const router = express.Router();

// router.post("/register", (req, res) => {  // to test this is working post -> get (http://localhost:5000/api/users/register)
//     res.send("Register is working !!");
// })
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/find", findUser)

module.exports = router