const asyncHandler = require("../middlewares/async");
const Product = require("../models/product");
const Cart = require("../models/Cart");
const User = require("../models/user.module");



//@description    Create new cart
//@route          POST/products
//@access         Public

exports.CreateNewCart = asyncHandler(async (req, res, next) => {
  const Pname = await Product.findOne({ name: req.body.productName });
 
  try {
    await Cart.create({
      name: Pname.name,
      image: Pname.image,
      price: Pname.price,
      sale: Pname.sale,
      SalePrice: Pname.SalePrice,
      Star: Pname.Star,
    
    });
    
    
    
  } catch (error) {
    console.log(error.message);
  }
  res.redirect("/products");
});

exports.getMyCarts = asyncHandler(async (req, res, next) => {
  try {
    
    const product=await Cart.find()
    const count = await Cart.find().countDocuments();
    
    res.render("../views/cart/index.ejs", {
      title:"Xaridlar",
      product,     
      count: count,
     
    });
  } catch (error) {
    console.log(error)
    res.json(error)
  }
 
});
//@description    Delete carts
//@route          POST/delecart
//@access         Public
exports.deleteCart = asyncHandler(async (req, res, next) => {
  const CId = await Cart.find({ _id: req.body.productId });
  
  await Cart.findByIdAndDelete({ _id: CId[0]._id });
  
  res.redirect("/carts");
});
