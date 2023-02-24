const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
   tittle:{
    type:String,
    required:true
   }, 
   body:{
    type:String,
    required:true
   },
   photo:{
    type:String,
    required:true
   },
   likes:[{
    type:ObjectId,
    ref:"User"
   }],
   comment:[{
    type:String,
    postedBy:{type:ObjectId,ref:"User"}
   }],
   postedBy:{
    type:ObjectId,
    ref:"User"
   }
   
      
})
module.exports=mongoose.model("Post",postSchema)