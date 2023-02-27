const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    pic: {
        type:String,
        default:"https://images.unsplash.com/photo-1677155875750-9eb42b39f4e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
    },
    followers:[{
        type:ObjectId,
        ref:'User'
    }],
    following:[{
        type:ObjectId,
        ref:'User'
    }]
})
module.exports=mongoose.model("User",userSchema)