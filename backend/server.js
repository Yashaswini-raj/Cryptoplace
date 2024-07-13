import express from 'express'
import cors from 'cors'
import { connectDB } from "./db/db.js"
import userRouter from './router/UserRouter.js'
import 'dotenv/config'
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

app.use("/api/user",userRouter)


app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(8002,()=>{
    console.log("server started");
})