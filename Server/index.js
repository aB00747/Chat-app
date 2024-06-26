const epxress = require("express");
const cors = require("cors"); // allow to communicate with front-end
const mongoose = require("mongoose"); // Database
const UserRoute = require("./Route/UserRoute"); // export  user route
const ChatRoute = require("./Route/ChatRoute"); // export  chat route
const MessageRoute = require("./Route/MessageRoute"); // export  message route

const app = epxress();  // app to create application
require("dotenv").config() // to use .env file

app.use(epxress.json());  // middleware call this method from express
app.use(cors());
app.use("/api/users", UserRoute); // add the routes in our server
app.use("/api/chats", ChatRoute);
app.use("/api/messages", MessageRoute);

// CRUD - create , read, update and delete

// Connecting to MongoDB database using Mongo

app.get("/", (req, res) => {
    res.send("Welcome our chat app API");
});

const port = process.env.PORT || 5000;   // port number for the server
const uri = process.env.ATLAS_URI;   // URI for the server
app.listen(port, (req, res) => {
    console.log(`server running on port... ${port}`)
}); // Go check the o/p. at your localhost

// uri connection string .env
mongoose.connect(uri).then(() => {
    console.log("MongoDB connection established");
}).catch((error) => {
    console.log("MongoDB connection failed:", error.message);
});

