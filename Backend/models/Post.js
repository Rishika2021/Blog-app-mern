const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    content:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
 module.exports=mongoose.model('Posts', blogSchema);