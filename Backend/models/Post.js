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
    postImg:
    {
        data: Buffer,
        contentType: String,
        type:String,
        // required:true,
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
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
});
 module.exports=mongoose.model('Posts', blogSchema);