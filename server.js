require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const axious = require('axios')
const app = express();

const PORT = process.env.PORT || 3000;


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
app.get('/',(req,res)=>{
    res.send("HELLO");
})
app.listen(PORT, ()=>{
    console.log("APP On PORT ", PORT)
})



