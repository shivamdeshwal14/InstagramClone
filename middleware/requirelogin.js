const jwt=require('jsonwebtoken')
const { SECRETKEY } = require('../keys')
const user = require('../models/user')
const { use } = require('../routes/auth')
module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    // checking if token exist
    if(!authorization){
        return res.status(401).json({error:"Please Login first"})
    }
    else{
        // matching token
        const token=authorization.replace("Bearer ","")
        jwt.verify(token,SECRETKEY,(err,payload)=>{
            if(err) 
            {
            
                return res.status(401).json({error:"You must be login"})
                
            }
            // token verified
            else{
                const {id}=payload
                user.findById(id)
                .then(userData=>{
                    req.user=userData
                    userData.password=undefined 
                    next()

                    
                })
            
                
                

            }
           
        })
    }
}