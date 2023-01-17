const studentModel = require('../models/studentModel')

module.exports = {
    createStudent : async (req, res) => {
       let {email,password} = req.body
       if(await studentModel.findOne({email:email})) return res.status(400).send({message:"This emailId already exists"})
        return res.status(201).send({data:await studentModel.create(req.body)})
    }
}