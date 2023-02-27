const express=require('express')
const User=require('../models/user')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { SECRETKEY } = require('../keys')
const requirelogin = require('../middleware/requirelogin')
// signup functionality
router.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!email ||!name ||!password)
    {
        res.status(422).json({error:"Please enter all details"})
    }
    else{
        // checking if user already exist
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                res.status(422).json({error:"User Already Exist"})
            }
            else{
                // pass bcrypt
               bcrypt.hash(password,12) 
               .then(hashedpassword=>{
                 const user=new User({
                    name,
                    email,
                    password:hashedpassword,
                    pic
                 })
                 user.save()
                 .then(user=>{
                    res.status(200).json({msg:"user added succesfully"})
                 })
               })

            }
        })

        
    }
    
})

// Login functionality 
router.post('/login',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){

    
    return res.status(422).json({error:"Please add Email and Password"})
}
    else{
        User.findOne({email:email})
        .then(dbUser=>{
            if(!dbUser){
                return res.status(422).json({error:"invalid email"})
            }
            else{
                bcrypt.compare(password,dbUser.password)
                .then(doMatch=>{
                   if(doMatch) {
                    const token=jwt.sign({id:dbUser._id},SECRETKEY)
                    return res.json({token})
                   }
                   else{
                    return res.status(422).json({error:"invalid password"})
                   }
                })
               
            }
        })
    }
})
router.get('/protected',requirelogin,(req,res)=>{
res.json(req.user)
})

module.exports=router