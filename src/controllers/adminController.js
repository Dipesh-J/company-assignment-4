const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel')

module.exports = {
    adminRegister : async (req,res)=>{
        let {email,password} = req.body

        if(await adminModel.findOne({email:email})) return res.status(400).send({message:"This email is already used"})

        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password,salt)

        req.body.password = hash

        const register = await adminModel.create(req.body)
        return res.status(201).send({message:"Registered Successfully"})
    },
    adminLogin : async (req,res) => {
        let {email,password} = req.body
        // CHECKING IF USER EXIST
        const userCheck = await adminModel.findOne({email:email})
        if(!userCheck) return res.status(404).send({message:"Incorrect emailId or user doesn't exist"})
        // CHECKING THE PASSWORD
        let passwordCheck = await bcrypt.compare(password,userCheck.password)
        if(!passwordCheck) return res.status(400).send({message:"Incorrect Password"})

        // CREATING JWT
        let token = jwt.sign({adminId:userCheck._id},"Secret-key",{expiresIn:'1d'})
        res.setHeaders("x-api-key",token)  // setting the token into response header (for frontend to handle how to provide token in request header)
    
        return res.status(200).send({token:token})
    }
}