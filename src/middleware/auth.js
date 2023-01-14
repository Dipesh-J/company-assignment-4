const jwt = require('jsonwebtoken')


module.exports = {
    authentication : async (req,res,next)=>{

        let token = req.header("x-api-key")
    
        jwt.verify(token,"Secret-key",(err,decodedToken)=>{
            if(err) {
                return res.status(401).send({message:err.message})
            }
            else{
                req.identity = decodedToken.adminId 
                next()
            }
        })
    },
    authorisation : async (req,res,next) => {
        
    }
}