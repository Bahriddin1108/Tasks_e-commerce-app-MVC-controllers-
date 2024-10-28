const {Router}=require('express')
const router=Router()

const {  createNewUser, loginUser, validation,  getLoginPage, getRegisterPage } = require('../Controllers/authController')




router.get('/login', getLoginPage)
router.get('/registration', getRegisterPage)



router.post('/login',validation,loginUser)
router.post('/registration',validation,createNewUser)


module.exports=router

