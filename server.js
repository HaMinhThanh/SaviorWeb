const express = require("express");
const app = express();


//const mongoose = require("mongoose");

// middleware
app.use(express.json());

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log("Backend sever is running!");
})