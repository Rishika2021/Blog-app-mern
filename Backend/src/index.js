require('dotenv').config()
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const router=require('./routers/PostRouter')
const cors=require('cors')
// mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true}, err=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('connected')
//     }
// })

const database= process.env.DATABASE_URL
mongoose.connect(database,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(err)=>console.error(err))
db.once('open',()=>console.log('connected to db'))

app.use(cors(
    {
       origin : "*",
       methods : ["POST","GET","DELETE","PATCH"]
    }
))
app.use(express.json())
app.use(router)
app.listen(3001,()=>{
    console.log('server started')
})