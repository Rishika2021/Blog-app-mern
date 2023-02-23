const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please add a username'],
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
    },
},
{timestamps:true});

const User=mongoose.model('User',UserSchema);
module.exports=User;