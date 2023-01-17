const joi = require('joi')

module.exports = {
    adminSchema : joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/).required()
    }),
    
}