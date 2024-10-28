const {Router}=require('express')
const router=Router()
const { SetMyOrder, GetMyOrder } = require('../Controllers/OrderController')

router.post('/orders',SetMyOrder)
router.get('/orders',GetMyOrder)

module.exports=router