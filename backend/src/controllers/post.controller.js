import {Post} from "../models/post.model.js"

const createPost = async(req,res)=>{
    try{
        const {name,description,age} = req.body

        if(!name || !description || !age){
            return res.status(400).json({message:"Required value missing."})
        }

        const post = await Post.create({name,description,age})
        res.status(201).json({message:"Post created successfully",post})
    }catch(error){
        res.status(500).json({message:"createPost failed."})
    }
}

const getAllPosts = async(req,res)=>{
    try{
        const allPosts= await Post.find()
        if(!allPosts){
            return res.status(404).json({message:"No posts in the database."})
        }
        res.status(201).json({message:"Posts sent.",allPosts})
    }catch(err){
        res.status(500).json("Internal Server Error")
    }
}


const deletePost = async(req,res)=>{
    try{
        const {name} = req.body
        const post = await Post.findOneAndDelete({name})
        if(!post){
            return res.status(400).json({message:"Post cannot be found"})
        }
        res.status(201).json({message:"post deleted"},post)
    }catch(err){
        res.status(500).json("Internal Server Error")
    }
}


//helper function for updatePost ///
const removeUndefined = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined && value!=="")
  );


const updatePost = async(req,res)=>{
    try{
        const {name, ...rest} = req.body
        if(!name){
            return res.status(400).json({message:"Post cannot be found"})
        }

        const updateData= removeUndefined(rest)
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data provided to update." });
        }
        const post= await Post.findOneAndUpdate({name},updateData,{new:true,runValidators:true})
        if (!post){
            return res.status(404).json({ message: "Post not found." });
        }   
        res.status(200).json({message:"Post updated",post})

    }catch(err){
        res.status(500).json("Internal Server Error")
    }
}


export {
    createPost,
    deletePost,
    updatePost,
    getAllPosts
}