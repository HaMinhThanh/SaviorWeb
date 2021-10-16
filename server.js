const express = require("express");
const app = express();


//const mongoose = require("mongoose");

// middleware
app.use(express.json());

app.listen(8080,()=>{
    console.log("Backend sever is running!");
})