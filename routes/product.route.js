const {Router}=require('express')
const router=Router()

const { getAllProducts, getOneProduct, indicator } = require('../Controllers/productController')


router.get('/',indicator)
router.get('/products',getAllProducts)
router.get('/products/:id',getOneProduct)



module.exports=router



