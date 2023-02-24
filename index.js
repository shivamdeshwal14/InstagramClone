const express=require('express')
const { default: mongoose } = require('mongoose')
const { MONGOURI } = require('./keys')

const app=express()
app.use(express.json())
app.use(require('./routes/auth'))



mongoose.connect(MONGOURI,(err)=>{
    if(err) console.log(err)
    else{
        console.log("Database Connected");
    }
})
 

const PORT=3000
app.listen(PORT,()=>console.log(`server is running at ${PORT}`))