const {Router}=require('express')
const router=Router()
const {getMyCarts, deleteCart,  CreateNewCart} = require('../Controllers/cartController')

router.get('/carts',getMyCarts)
router.post('/deleteCart',deleteCart)
router.post('/products',CreateNewCart)

module.exports=router