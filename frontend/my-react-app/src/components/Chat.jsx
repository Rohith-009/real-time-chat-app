import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function Chat(){

const [username,setUsername] = useState("");
const [joined,setJoined] = useState(false);

const [message,setMessage] = useState("");
const [messages,setMessages] = useState([]);

const [onlineUsers,setOnlineUsers] = useState([]);
const [typingUser,setTypingUser] = useState("");


useEffect(()=>{

axios.get("http://localhost:5000/messages")
.then(res=>{
setMessages(res.data);
});

},[]);

useEffect(()=>{

socket.off("receive_message");
socket.off("online_users");
socket.off("user_typing");

socket.on("receive_message",(data)=>{
setMessages(prev=>[...prev,data]);
});

socket.on("online_users",(users)=>{
setOnlineUsers(users);
});

socket.on("user_typing",(user)=>{
setTypingUser(user);

setTimeout(()=>{
setTypingUser("");
},2000);
});

},[]);

const joinChat = ()=>{

if(username !== ""){

socket.emit("join",username);

setJoined(true);

}

};

const sendMessage = ()=>{

if(message !== ""){

const msgData = {
user:username,
text:message
};

socket.emit("send_message",msgData);

setMessage("");

}

};

const handleTyping = (e)=>{

setMessage(e.target.value);

socket.emit("typing",username);

};


return(

<div className="h-screen bg-gray-200 flex justify-center items-center">

<div className="w-[900px] bg-white shadow-lg rounded-lg flex">

<div className="w-1/3 border-r p-4">

<h3 className="font-bold mb-3">Online Users</h3>

{onlineUsers.map((u,i)=>(
<div key={i} className="flex items-center mb-2">
<div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
{u}
</div>
))}

</div>


<div className="flex flex-col flex-1 p-4">

<h2 className="text-xl font-bold text-center mb-3">
Real Time Chat
</h2>


{!joined ?(

<div className="text-center mt-10">

<input
placeholder="Enter username"
onChange={(e)=>setUsername(e.target.value)}
className="border p-2 rounded"
/>

<br/><br/>

<button
onClick={joinChat}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Join Chat
</button>

</div>

):(


<>

<div className="flex-1 border rounded p-3 overflow-y-scroll mb-3 bg-gray-50">

{messages.map((msg,i)=>(

<div key={i} className="mb-2">

<span className="font-semibold text-blue-600">
{msg.sender || msg.user}
</span>

<span className="text-gray-700">
: {msg.message || msg.text}
</span>

<span className="text-xs text-gray-400 ml-2">
{msg.time ? new Date(msg.time).toLocaleTimeString() : ""}
</span>

</div>

))}

</div>


{typingUser &&(
<p className="text-sm text-gray-500">
{typingUser} is typing...
</p>
)}


<div className="flex">

<input
value={message}
onChange={handleTyping}
placeholder="Type message"
className="border flex-1 p-2 rounded"
/>

<button
onClick={sendMessage}
className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
>
Send
</button>

</div>

</>

)}

</div>

</div>

</div>

);

}

export default Chat;