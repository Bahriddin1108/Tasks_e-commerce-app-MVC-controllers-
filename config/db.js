const mongoose=require('mongoose')

const connectDB=async()=>{
    const connect=await mongoose.connect(process.env.MONGO_URI)
} 
module.exports= connectDB