const mongoose=require('mongoose')

const Carts= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    sale:{
        type:Boolean,
        required:true,
    },
    SalePrice:{
        type:Number,
    },
    Star:{
        type:Boolean,
        required:true,
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
      
    }
    
},
{timestamps:true}
)

module.exports= mongoose.model('Cart',Carts)