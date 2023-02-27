const express=require('express')
const requirelogin = require('../middleware/requirelogin')
const Post = require('../models/post')
const router=express.Router()
const User=require('../models/user')


router.get('/user/:id',requirelogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err)
            {
                console.log(err);
                return res.status(422).json({error:err})
            }
            else{
                
                return res.status(200).json({user,posts})
            }
        })
    })
})
// follow
router.put('/follow',requirelogin,(req,res)=>{
       User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            User.findByIdAndUpdate(req.user._id,{
                $push:{following:req.body.followId}
            },{
                new:true
            }).select("-password")
            .then(results=>res.json(results))
        }
    }
    
    
    )
})
// Unfollow
router.put('/unfollow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
     $pull:{followers:req.user._id}
 },{
     new:true
 },(err,result)=>{
     if(err){
         return res.status(422).json({error:err})
     }
     else{
         User.findByIdAndUpdate(req.user._id,{
             $pull:{following:req.body.followId}
         },{
             new:true
         }).select("-password")
         .then(results=>res.json(results))
     }
 }
 
 
 )
})



module.exports=router