const questionModel = require('../models/questionModel')
const aws = require("../middleware/aws")



module.exports = {
    uploadQuestion : async (req,res) =>{
        let {question,solution} = req.body
        let multimedia  = req.files
        
        if(!req.body.question) return res.status(400).send({message: "Question field can't be empty"})
        if(!req.body.solution) return res.status(400).send({message: "Solution field can't be empty"})
        
        const duplicateQuestion = await questionModel.findOne({question:question})
        if(duplicateQuestion) return res.status(400).send({message:"This quesiton already exists"})

        if(multimedia) {
            let uploadedFileURL = await aws.uploadFile(multimedia[0]) 
            req.body.multimedia = uploadedFileURL
        }
        return res.status(201).send({message:"Question uploaded successfully",data:await questionModel.create(req.body)})
    },
    getQuestions : async (req,res) =>{
        
        return res.status(200).send(await questionModel.find())
    }
}