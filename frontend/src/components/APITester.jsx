import React, { useState } from "react";
import axios from "axios";


const APITester = () =>{

    const [response, setResponse] = useState("");
    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    })
    //GET request example

    const handleGet = async()=>{
        try{
            const res = await axios.get("http://localhost:4000/api/v1/users/")
            setResponse(JSON.stringify(res.data,null,2))
        }catch(err){
            setResponse(err.message)
        }
    }

    const handlePost = async()=>{
        try{
            const res = await axios.post("http://localhost:4000/api/v1/users/register",
                {
                    username:"George",
                    email:"george@gmail.com",
                    password:"123456"
                }
            )
            setResponse(JSON.stringify(res.data,null,2))
        }catch(err){
            setResponse(err.message)
        }
    }

    const handleChange = (e)=>{
        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!loginData.email || !loginData.password) return

        try{

            const res = await axios.post("http://localhost:4000/api/v1/users/login",
                {
                    email:loginData.email,
                    password:loginData.password
                }
            )
            setResponse(JSON.stringify(res.data,null,2))
        }catch(err){
            setResponse(err.message)
        }
    }

    const handleLogout=async()=>{
        const res = await axios.post("http://localhost:4000/api/v1/users/logout",
            {
                email:"george@gmail.com",
            }
        )
        setResponse(JSON.stringify(res.data,null,2))
    }


    return (
        <>
        <h1>API Test</h1>
            <button onClick={handleGet}>Send GET Request</button>
            <button onClick={handlePost}>Send Post Request</button>
        <form onSubmit={handleSubmit}>
            <input name ="email" value={loginData.email}onChange={handleChange}placeholder="Enter Email"/>
            <input name ="password"value={loginData.password}type="password" onChange={handleChange}placeholder="Enter Password"/>
            <button type="submit">Login</button>
        </form>
            <button onClick={handleLogout}>Logout</button>
            <pre>{response}</pre>
        </>
    )


}

export default APITester