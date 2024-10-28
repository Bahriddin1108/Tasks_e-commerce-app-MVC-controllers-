const mongoose=require('mongoose')

const Products= new mongoose.Schema({
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
   
    
},
{timestamps:true}
)

module.exports= mongoose.model('Product',Products)