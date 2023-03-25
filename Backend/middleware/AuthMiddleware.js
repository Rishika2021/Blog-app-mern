const User=require('../models/User') 
const jwt=require('jsonwebtoken')

const protect=async (req, res, next)=>{
   let token
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{ 
        //get token from cookie

        // console.log(req)
        // token= req.cookies.jwtoken;
        token=req.headers.authorization.split(' ')[1]          //splits the token and bearer returns the second treats it as array
        console.log(token)
        //Verify token
         const decoded=jwt.verify(token,process.env.JWT_TOKEN)   //verifying the token using secret and in decoded we get payload which is id of user using this id we'll get user
        //  console.log(decoded)
        //get user from token
        req.user=await User.findById(decoded.id).select('-password')  //finding the user whose id is in the token and next 
        // req.token=token
        next()
    }catch(error){
        console.log('Not authorised')
        return res.status(401)                                //for err-cannot set headers return
        .json({isLoggedIn:false, message:'Not authorized'})
    }
  }
   if(!token){
    console.log('No token')
      return  res.status(403)
     .json({isLoggedIn:false, message:'Not authorized, no token'})
       
   }
}
module.exports={protect}
// middleware is a function that runs between a req and res cycle so this function protect will run after you req a particular route and check if you are authorized or not