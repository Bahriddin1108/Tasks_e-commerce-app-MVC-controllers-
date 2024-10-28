const asyncHandler = require("../middlewares/async");
const Product = require("../models/product");
const Cart = require("../models/Cart");
const User = require("../models/user.module");
const OrderModule = require("../models/Order.module");
const { default: mongoose } = require("mongoose");

exports.SetMyOrder = asyncHandler(async (req, res, next) => {
  await Cart.updateMany(
    {} , 
    { $set: { client:new mongoose.Types.ObjectId('01234567890123456789aaaa') } }
  );
  console.log('works')
 res.redirect('/registration')
});

exports.GetMyOrder = asyncHandler(async (req, res, next) => {
  const userID=req.session.user._id
  const orders= await OrderModule.find({client:userID})
  const num= await OrderModule.find({client:userID}).countDocuments();
  

 
  
  res.render('../views/orders/index.ejs',{
    title:req.session.user.name+"'s purchases",
    orders,
    num
  })
});