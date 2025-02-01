import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
// ISSUE WHEN THE USER LOGS IN USING THE GOOGLE O AUTH 
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected To Database Successfully")
})
.catch((err)=>{
    console.log(err);  
})

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true 
}))

app.listen(3000,()=>{
    console.log("Listening port 3000")
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    
    const statusCode = err.statusCode || 500;
    const errorMessage = err.errorMessage || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        errorMessage
    })
})

app.get('/',(req,res)=>{
    console.log('hey');
})