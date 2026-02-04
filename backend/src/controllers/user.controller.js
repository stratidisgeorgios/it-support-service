import {User} from "../models/user.model.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({
    path: '../../.env'
})
const registerUser = async (req,res) => {
    try{
        const {username,email,password} = req.body;
        //basic validation
        if (!username || !email || !password){
            return res.status(400).json({ message: "All fields are important!"})
        }
        // check if user exists already
        const existing = await User.findOne({email: email.toLowerCase()})
        if (existing){
            return res.status(409).json({message:"user already exists"})
        }
        
        //create user
        
        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password
        })
        res.status(201).json({
            message:"User registered",
            user:{id:user._id,email:user.email,username:user.username}
        })
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;
                //basic validation
        if (!email || !password){
            return res.status(400).json({ message: "All fields are important!"})
        }

        const user = await User.findOne({email:email.toLowerCase()})
        if(!user){
           return res.status(404).json({message:"User not found"})
        }
        
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:"Password is not correct"})

        }
        const payload = {
            email:email,
            roles:user.roles
        }
        const accessToken = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({message:"Successfully logged in",user:{id:user._id,email:user.email,username:user.username,roles:user.roles},accessToken})

    }catch(error){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

const logoutUser = async(req,res)=>{
    try{
        const {email} =req.body

        const user = await User.findOne({email:email.toLowerCase()})
        if(!user){
           return res.status(404).json({message:"User not found"})
        }

        res.status(200).json({message:"Successfully logged out of the account",user:{id:user._id,email:user.email,username:user.username}})
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error})
    }
}

const getAllUsers= async(req,res)=>{
    
    try{
        const users= await User.find()
    
        if(!users){
            return res.status(400).json({message:"Database has no users."})
        }
    
        res.status(200).json({message:"All users sent",users})
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error})
    }
}


const deleteUser = async()=>{
    const username = req.body
    const user = await User.findOneAndDelete({username:username})
    if(!user){
        return res.status(400).json({message:'User not found'})
    }
    res.status(200).json({message:"User deleted"},user)

}

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    deleteUser
    
}