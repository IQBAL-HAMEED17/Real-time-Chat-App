const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("connection succesfull");
})
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
       from:"neha",
    to:"priya",
    msg:"send me your exam sheets",
    created_at:new Date(),
    } ,
      {
  from:"iqbal",
    to:"ziya",
    msg:"send me your photo",
    created_at:new Date(),
    },
      {
  from:"ziya",
    to:"iqbal",
    msg:"ok i will send to you",
    created_at:new Date(),
    },
    
];
Chat.insertMany(allchats);

