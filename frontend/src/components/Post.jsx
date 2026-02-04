import React, { useState } from "react";
import axios from "../api/axios";


export default function Post(){
    const [response, setResponse] = useState("");
    const [post,setPost]=useState({
        name:"",
        description:"",
        age:1
    })


    const handleCreatePosts= async(e)=>{
        e.preventDefault()
        const action = e.nativeEvent.submitter.value;
        try{
            if(action==="create"){

                if(!post.age || !post.name ||!post.description) return
                
                const res = await axios.post("/api/v1/post/create",
                    {
                        name:post.name,
                        description:post.description,
                        age:post.age
                    }
                )
                setResponse(JSON.stringify(res.data,null,2))
            }
            if(action==="update"){
                if(!post.name) return
                const res = await axios.post("/api/v1/post/update",
                    {
                        name:post.name,
                        description:post.description,
                        age:post.age
                    }
                )
                setResponse(JSON.stringify(res.data,null,2))
            }

            if(action==="delete"){
                if(!post.name)return
                const res= await axios.post("http://localhost:4000/api/v1/post/delete",
                    {
                        name:post.name
                    }
                )
                setResponse(JSON.stringify(res.data,null,2))

            }
        }catch(err){
            setResponse(err.message)
        }
    }

    const handleChangePost = (e)=>{
    setPost({
        ...post,
        [e.target.name]:e.target.value
    })
}

    const getAllPosts = async()=>{
        try{
            const res = await axios.get("http://localhost:4000/api/v1/post/all")
            setResponse(JSON.stringify(res.data,null,2))
        }catch(err){
            setResponse(err.message)
        }
    }


    return(
        <>
        <h1>Post Form</h1>
        <form onSubmit={handleCreatePosts}>
            <input name ="name" value={post.name}onChange={handleChangePost}placeholder="Enter the name"/>
            <input name ="description"value={post.description} onChange={handleChangePost}placeholder="Enter the description"/>
            <input name="age" value={post.age} onChange={handleChangePost} placeholder="Enter age"/>
            <button type="submit" name="action" value="create">Create a Post</button>
            <button type="submit"name="action" value="update">Update a Post</button>
            <button type="submit" name="action" value="delete">Delete a Post</button>
        </form>
        <button onClick={getAllPosts}>Get all Posts!</button>
        <pre>{response}</pre>

        </>
    )
}