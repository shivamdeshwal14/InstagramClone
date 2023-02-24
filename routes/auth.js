const express=require('express')
const User=require('../models/user')
const router=express.Router()
const bcrypt=require('bcrypt')
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
module.exports=router