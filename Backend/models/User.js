const mongoose=require("mongoose")
const jwt=require('jsonwebtoken')


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
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true, 
    //     }
    // }]
},
{timestamps:true});

// UserSchema.methods.AuthToken = async function(){  //common method for all users hence using userschema methods
//     const user = this
//     const token = jwt.sign({_id:user._id.toString()} , process.env.JWT_TOKEN)
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token   //returning a single token that we generated
// }

const User=mongoose.model('User',UserSchema);
module.exports=User;