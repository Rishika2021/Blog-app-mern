require('mongodb')
const express=require("express")
const { ObjectId } = require('mongodb')
const router= new express.Router()
const Posts=require('../../models/Post')  
const {protect}=require('../../middleware/AuthMiddleware')

//get all
router.get('/posts' ,protect,async (req,res)=>{
   const {search}=req.query;
   console.log(req.query)
  
   if(search){
    console.log(search)
   await Posts.aggregate(
      [
        {
          '$search': {
            'index': 'default', 
            'autocomplete': {
              'query': search, 
              'path': 'title'
            }
          }
        }, {
          '$limit': 5
        }, {
          '$project': {
            '_id': 1, 
            'title': 1, 
            'author': 1, 
            'createdAt': 1
          }
        }
      ]
    ).then((posts)=>{
      console.log(posts)
       return res.status(201).send(posts)
    }).catch((err)=>{
       return res.status(500).send(err.getMessage)
    })
   }else{
    Posts.find({}).then((posts)=>{
       console.log(posts)
       return res.status(201).send(posts)
    }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err.getMessage)
    })
   }
    
})
//get one
router.get('/posts/:id',protect ,(req,res)=>{
    const id=(req.params.id)
    Posts.findById(id).then((post)=>{
        if(!post){
          return res.status(404).send()
        }
        return res.status(200).send(post)
    }).catch((err)=>{
      return res.status(500).send()
    })
})
//create one
router.post('/posts/new' ,protect,async (req,res)=>{
    try{
        // const post= new Posts(req.body)
        // console.log(post)
        const post=new Posts({...req.body , user : req.user.id})
        // console.log(req.body)
        await post.save().then(()=>{
          // console.log(post)
          return res.status(201).send(post)
        })
        .catch(e=>{
          console.log(e)
          return res.status(400).send(e.getMessage())
           
        })
    }catch(err){
        return res.status(500).send(err)
    }
});
//Update one
router.patch('/posts/edit/:id' ,protect,async (req,res)=>{
    // const updates=Object.keys(req.body)
    // const newObj=JSON.parse(req.body)
    // console.log(newObj)
    // console.log(updates)
    console.log(req.body)
    const keys=Object.keys(req.body)
    // console.log(keys)
    const allowedUpdates=['title', 'author', 'content']
    const isValidOperation= keys.every((update)=>{
       return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
       return res.status(503).send({error:'Invalid Update!'})
      }
    try{
      const post= await Posts.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
      if(!post){
        return res.status(200).send('no post found')
      } 
      return res.status(200).send(post)
    }catch(e){
       return res.status(500).send(e.getMessage())
    }
    
})
//Delete one
router.delete('/posts/:id',protect ,async (req,res)=>{
    try{
        const post=await Posts.findByIdAndDelete({_id:req.params.id})
        if(!post){
          return res.status(400).send()
        }
        return res.status(200).send(post)
      }catch(e){
        return res.status(500).send(e)
      }
})
module.exports=router