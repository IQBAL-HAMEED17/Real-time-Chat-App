const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));//data will parsed
main().then(()=>{
    console.log("connection succesfull");
})
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get("/chats/:user/:friend",async(req,res)=>{
const { user, friend } = req.params;
let allChats = await Chat.find();

let chats = allChats.filter(chat => 
  (chat.from === user && chat.to === friend) ||
  (chat.from === friend && chat.to === user)
);
  
console.log(chats);
res.render("index.ejs",{user,friend,chats});
});
//new route
app.get("/chats/new",(req,res)=>{
res.render("new.ejs");
});
//create route
app.post("/chats/send",(req,res)=>{
    let {from,to,msg}=req.body;
let newChat= new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
});

newChat.save().then(res=>{console.log("chat was saved")}).catch(err=>{console.log(err)});
res.redirect(`/chats/${from}/${to}`);
})
app.get("/",(req,res)=>{
    res.send("root is working");
});

app.listen(8080,()=>{
    console.log("server is listening on port");
});