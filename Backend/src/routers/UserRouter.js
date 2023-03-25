require('mongodb')
const express=require("express")
const { ObjectId } = require('mongodb')
const userRouter= new express.Router()
const User=require('../../models/User') 
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const Posts=require('../../models/Post')  
const {protect}=require('../../middleware/AuthMiddleware')

userRouter.post('/register', async (req,res)=>{
    const { username, email, password }=req.body
    if(!username || !email || !password){
        res.status(400)
        console.log('Please provide all fields')
        // throw new Error('Please provide all fields')
    }
    // Check if user exists
    const takenUsername=await User.findOne({username})
    const takenemail=await User.findOne({email})
    if(takenUsername || takenemail){
        res.status(400)
        // console.log('Username or email already taken')
         res.json('Username or email already taken')
        // throw new Error('Username or email already taken')
    }
    //Hash password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser=await User.create({
        username,
        email,
        password:hashedPassword
    }) 
    //  await newUser.save()               
    // .then(()=>{                                                 //error can't set headers
    //     // return res.status(201).send({message:'Success'})
    //     res.json({message:'Success'})
    //   })
    //   .catch(e=>{
    //     console.log({message:e})
    //     // return res.status(400).send(e.getMessage())   
    //   })
    if(newUser){
        // const token=await newUser.AuthToken()
        // res.cookie("jwtoken", token, {
        //     expires: new Date(Date.now() + 25892000),
        //     httpOnly: true,
        // });
        res.status(200)
        // .json({message:'Success'})
        .json({                  
            _id:newUser._id,
            name:newUser.username,
            email:newUser.email,
            // token:token,
            token:generateToken(newUser._id)
        })
    }else{
        res.status(400).json({message:'Invalid user data'})
    }
    
})


userRouter.post('/login', async (req,res)=>{
    const {email,password}=req.body
     console.log('login req-'+ email + password)
    //check for user email
    const user= await User.findOne({email})
    // console.log('login user-'+ user)
    // const token=await user.AuthToken()
    // console.log('token '+ token)
    // res.cookie("jwtoken", token, {
    //     expires: new Date(Date.now() + 25892000),
    //     httpOnly: true,
    // });
    // console.log(token)
    // console.log(user)
    if(user && (await bcrypt.compare(password,user.password))){
         res.send({
            _id:user._id,
            name:user.username,
            email:user.email,
            token:generateToken(user._id)
            // token:token,
         })
        console.log('found user')
    }else{
        res.json({message:'Invalid Credentials'})
    }
    // res.json({message:'login '})
})

userRouter.get("/isUserAuth",protect, (req, res) => {
    return res.json({isLoggedIn: true, user: req.user})
})

userRouter.get('/getme',protect, async (req,res)=>{
    // console.log(req.user)
    const{id,username,email}=await User.findById(req.user.id)  //finding the user that is logged in
    const allposts=await Posts.find({user:req.user.id})        //getting all posts of the logged in user using req.user provided by middleware
    console.log(allposts)
    res.status(200).json({
        _id:id,
        name:username,
        email:email,
        allPosts:allposts
     })
    // res.json({message:'This is me'})
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_TOKEN,{
        expiresIn:'1d',
    })
}
module.exports=userRouter