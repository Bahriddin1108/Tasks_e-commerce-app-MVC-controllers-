const asyncHandler = require("../middlewares/async");
const Product = require("../models/product");
const Cart = require("../models/Cart");


//@description    Get All products
//@route          GET/products
//@access         Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  const count = await Product.countDocuments();
 
  
  if(!req.session.user){
    const number = await Cart.find().countDocuments();
   return  res.render("../views/products/index.ejs", {
      title: "All Products",
      product: products,
      count: count,
      num: number,
     
    });  
  }
  else{
  const number = await Cart.find().countDocuments();
  return res.render("../views/products/index.ejs", {
    title: "All Products",
    product: products,
    count: count,
    num: number,
   
  });}
});
//@description    Get one product page
//@route          GET/products/:id
//@access         Public
exports.getOneProduct = asyncHandler(async (req, res, next) => {
 const oneProduct=await Product.find({name:req.params.id})

  res.render("../views/products/details.ejs", {
    title: "One product",
    oneProduct:oneProduct[0] 
  });
});
//@description    Route main mage to products page
//@route          GET/
//@access         Public
exports.indicator=asyncHandler(async(req,res,next)=>{
  await Cart.deleteMany({});
  res.redirect('/products')
})
