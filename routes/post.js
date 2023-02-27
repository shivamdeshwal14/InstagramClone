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
// Show All post
router.get('/allpost',requirelogin,(req,res)=>{
   Post.find()
   .populate("postedBy","_id name")
   .then(posts=>res.json(posts)) 
})
// show my post
router.get('/mypost',requirelogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json(mypost)
    })
})

module.exports=router