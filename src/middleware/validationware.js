const validator = require('../validator/validator')

module.exports = {
    adminValidation : (req,res,next) => {
        const { error } = validator.adminSchema.validate(req.body)
        if(error){
            return res.status(400).send({ status: false, message: error.message })
        } 
        else next()
    },
}