const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/chatDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));



const MessageSchema = new mongoose.Schema({
  sender:String,
  message:String,
  time:{
    type:Date,
    default:Date.now
  }
});

const Message = mongoose.model("Message",MessageSchema);


const server = http.createServer(app);


const io = new Server(server,{
  cors:{origin:"*"}
});


let users = {};


io.on("connection",(socket)=>{

  console.log("User connected:",socket.id);


  

  socket.on("join",(username)=>{

    users[socket.id]=username;

    const uniqueUsers=[...new Set(Object.values(users))];

    io.emit("online_users",uniqueUsers);

  });



  socket.on("typing",(username)=>{
    socket.broadcast.emit("user_typing",username);
  });


  /* Send Message */

socket.on("send_message",async(data)=>{

const newMessage = new Message({
sender:data.user,
message:data.text,
time:new Date()
});

await newMessage.save();

io.emit("receive_message",{
sender:newMessage.sender,
message:newMessage.message,
time:newMessage.time
});

});


  /* Disconnect */

  socket.on("disconnect",()=>{

    delete users[socket.id];

    const uniqueUsers=[...new Set(Object.values(users))];

    io.emit("online_users",uniqueUsers);

  });

});


/* Load Message History */

app.get("/messages",async(req,res)=>{

  const messages = await Message.find().sort({time:1});

  res.json(messages);

});


/* Start Server */

server.listen(5000,()=>{
  console.log("Server running on port 5000");
});