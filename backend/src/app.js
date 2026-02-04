import express from "express";
import userRouter from './routes/user.route.js'
import cors from 'cors'
import postRouter from './routes/post.route.js'
const app = express();

app.use(express.json());

app.get('/health',(_req,res)=>{
    res.json({status:"ok"})
})
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true               // allow cookies
}));
app.use("/api/v1/users",userRouter);
app.use("/api/v1/post",postRouter)

export default app