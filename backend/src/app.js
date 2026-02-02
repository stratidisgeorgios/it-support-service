import express from "express";
import userRouter from './routes/user.route.js'
import cors from 'cors'
const app = express();

app.use(express.json());

app.get('/health',(_req,res)=>{
    res.json({status:"ok"})
})
app.use(cors())
app.use("/api/v1/users",userRouter);

export default app