const express=require('express')
const { default: mongoose } = require('mongoose')
const { MONGOURI } = require('./keys')
const app=express()
app.use(express.json())

mongoose.connect(MONGOURI,(err)=>{
    if(err) console.log("Not connected")
    else{
        console.log("Database Connected");
    }
})


const PORT=3000
app.listen(PORT,()=>console.log(`server is running at ${PORT}`))