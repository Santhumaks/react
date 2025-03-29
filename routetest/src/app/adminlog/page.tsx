"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin(){
    const[adata,setadata]=useState({
        aname:"",
        apass:""
    });
    const router=useRouter();
    useEffect(()=>{window.scrollTo(0,0);},[]);
    const handleChange = (e: any) => {
        setadata({
          ...adata,
          [e.target.name]: e.target.value,
        });
    }
    return(
        <div className="pt-6 mt-16 bg-gray-100 pb-10 flex flex-col items-center">
            <button onClick={()=>router.push("/")} className="w-20 mr-230  bg-gray-600 text-white py-2 rounded-md hover:bg-blue-600 transition">back</button>
            <div className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-center text-xl text-blue-600">ADMIN LOGIN</h1>
        <label className="text-gray-700 font-bold">UserName:</label>
        <input type="text" name="aname"  onChange={handleChange} required className="border p-2 mt-20 w-53 rounded-md"/><br/>
        <label className="text-gray-700 font-bold">Password:</label>
        <input type="password" name="apass"  onChange={handleChange} required className="border p-2 mt-15 w-53 rounded-md"/><br/>
        <button className="w-50 mt-15 ml-13 bg-gray-600 text-white py-2 rounded-md hover:bg-blue-600 transition" onClick={()=>adata.aname=="santhu" && adata.apass=="santhu2005"?router.push("/adminlog/admindash"):alert("Login failed")}>Login</button>
        
        </div>
        </div>
    );
}