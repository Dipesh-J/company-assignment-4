const router = require('express').Router()
const adminController = require('../controllers/adminController')
const validationware = require('../middleware/validationware')

router.post('/register',validationware.adminValidation,adminController.adminRegister)
router.post('/login',validationware.adminValidation,adminController.adminLogin)

module.exports = router