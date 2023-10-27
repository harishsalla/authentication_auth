const dotenv=require('dotenv')

const express=require('express')

const db=require('./config/config')
const userRoutes=require('./routes/userRoutes')

const app=express()
app.use(express.json())
dotenv.config()
const port=process.env.PORT
// app.use(cors())

app.use("/api/user",userRoutes)



app.listen(port,(req,res)=>{
    console.log(`Server listening at ${port}`)
})