"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllRecords } from "../services/api";
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password:string;
  phno: string;
  address: string;
  status: boolean;
}

export default function Admin(){
    const[usdata,setusdata]=useState({
        usname:"",
        uspass:""
    });
    const router=useRouter();
    useEffect(()=>{window.scrollTo(0,0);},[]);
    const handleChange = (e: any) => {
        setusdata({
          ...usdata,
          [e.target.name]: e.target.value,
        });
    }
    const handleLog=async (e:any)=>{
      if (!usdata.usname || !usdata.uspass) {
        alert("Both Username and Password are required!");
        return;
      }
         try {
              const response = await getAllRecords(); 
              const filteredUser: User = response.find((user: User) => user.username === usdata.usname);
              
              if(filteredUser.password===usdata.uspass){
                console.log(filteredUser)
                console.log("hi")
                 alert("Login success");
                 router.push(`/form/dashboard/${filteredUser.id}`);
              }
              else{
                alert("Password Incorrect")
              }
            } catch (error:any) {
              alert("User not found")
            }
    };
    return(
        <div className="pt-6 mt-16 bg-gray-100 pb-10 flex flex-col items-center">
          <button onClick={()=>router.push("/")} className="w-20 mr-230  bg-gray-600 text-white py-2 rounded-md hover:bg-blue-600 transition">back</button>
            <div className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-center text-xl text-blue-600">USER LOGIN</h1>
        <label className="text-gray-700 font-bold">UserName:</label>
        <input type="text" name="usname"  onChange={handleChange} required className="border p-2 mt-20 w-53 rounded-md"/><br/>
        <label className="text-gray-700 font-bold">Password:</label>
        <input type="password" name="uspass"  onChange={handleChange} required className="border p-2 mt-15 w-53 rounded-md"/><br/>
        <button className="w-50 mt-15 ml-13 bg-gray-600 text-white py-2 rounded-md hover:bg-blue-600 transition" onClick={handleLog}>Login</button>
        <h3>Dont have account?<Link href="/registerform">create account</Link></h3>
        </div>
        </div>
    );
}