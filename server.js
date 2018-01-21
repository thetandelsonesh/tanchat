const express = require("express");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(express.static('./public/'));

var users = [];

app.set("users",users);

app.use("/registration",require("./routes/registration"));
app.use("/chat",require("./routes/chat"));

var io = socketIO.listen(app.listen(port,function(){
    console.log(`Server Running on port http://localhost:${port}`);
    app.set("io",io);
}));