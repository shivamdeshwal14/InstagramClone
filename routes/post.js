const express=require('express')
const router=express.Router()
const requirelogin=require('../middleware/requirelogin');
const Post  = require('../models/post');


// Create POST 
router.post("/createPost",requirelogin,(req,res)=>{
    const {tittle,body,pic}=req.body
    if(!tittle ||! body || !pic)
    {
       return res.status(200).json({error:"Please add all the fields"})
    }
    else{
        // console.log("req.userrr----->");
        // console.log(req.user);
        const post=new Post({tittle,body,photo:pic,postedBy:req.user})
        post.save()
        .then(result=> res.json(result))
    }
})

module.exports=router