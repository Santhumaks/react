"use client";
import { createRecord } from "../services/api";
import React, { useEffect, useState } from "react";
import ValidatedInput from "../validinput/page";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Proform() {
  useEffect(()=>{window.scrollTo(0,0);},[]);
  const [udata, setData] = useState({
    name: "",
    phno: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const router = useRouter();
  const [error, setError] = useState("This field is required");
  const [clr, setClr] = useState("red");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhnoValid, setIsPhnoValid] = useState(false);
  const [isPrjDesValid, setIsPrjDesValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setData({
      ...udata,
      [name]: value,
    });
    
    if (name === "confirmPassword" || name === "password") {
      setIsPasswordMatch(udata.password === value || value === udata.confirmPassword);
    }
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      alert("Passwords do not match");
      return;
    }
    
    console.log(" Sending data to API:", JSON.stringify(udata, null, 2));
    
    try {
      const response = await createRecord(udata);
      console.log(" API Response:", response.data);
      router.push("/form");
    } catch (error:any) {
      console.error(" API Error:", error.response?.data || error.message);
    }
  };
  
  const prjdesc = (address: boolean) => {
    if (!address) {
      setError("This field is required");
      setClr("red");
      setIsPrjDesValid(false);
    } else {
      setError("");
      setClr("green");
      setIsPrjDesValid(true);
    }
  };

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhnoValid &&
    isPrjDesValid;

  return (
    <div className="pt-6  bg-gray-100  min-h-screen flex flex-col items-center">
      <button onClick={()=>router.push("/form")} className="w-20 mr-230  bg-gray-600 text-white py-2 rounded-md hover:bg-blue-600 transition">back</button>
      <div className="max-w-3xl mb-10 bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-center text-xl text-blue-600 pb-10">User Registration Form</h1>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <ValidatedInput
            label="Name"
            name="name"
            placeholder="Enter your name"
            pattern="^[A-Za-z. ]+$"
            errmsg="Please enter alphabet only"
            required={true}
            onValidChange={setIsNameValid}
          />
          <ValidatedInput
            label="Ph no"
            name="phno"
            placeholder="Enter your phone no"
            pattern="^\d{10}$"
            errmsg="Please enter valid phone number"
            required={true}
            onValidChange={setIsPhnoValid}
          />
          <ValidatedInput
            label="E-mail"
            name="email"
            placeholder="Enter your email id"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            errmsg="Please enter valid mail id"
            required={true}
            onValidChange={setIsEmailValid}
          />
         
          <div>
            <label className="text-gray-700 font-bold">Address:</label>
            <br />
            <textarea
              className={`border p-2 w-full rounded-md transition ${
                clr === "red" ? "border-red-500" : "border-green-500"
              }`}
              onChange={(e: any) => prjdesc(e.target.value)}
              name="address"
              placeholder="Enter your Address"
            ></textarea>
            <br />
            <span className="text-red-500 text-xs font-medium block text-center">{error}</span>

          </div>
          <ValidatedInput
            label="Username"
            name="username"
            placeholder="Enter a unique username"
            pattern=""
            errmsg=""
            required={true}
            onValidChange={setIsNameValid}
          />
        <label className="block text-gray-700 font-bold mt-4">Password</label>
<input 
  type="password" 
  name="password" 
  placeholder="Enter password" 
  className="border p-2 w-full rounded-md" 
  required 
  onChange={handleChange} 
  value={udata.password}
/>
<div className="min-h-[16px]">
  {!udata.password && <span className="text-red-500 text-xs">This field is required</span>}
</div>

<label className="block text-gray-700 font-bold mt-4">Confirm Password</label>
<input 
  type="password" 
  name="confirmPassword" 
  placeholder="Re-enter password" 
  className="border p-2 w-full rounded-md" 
  required 
  onChange={handleChange} 
  value={udata.confirmPassword}
/>
<div className="min-h-[16px]">
  {!udata.confirmPassword && <span className="text-red-500 text-xs">This field is required</span>}
  {!isPasswordMatch && udata.confirmPassword && <span className="text-red-500 text-xs">Passwords do not match</span>}
</div>


          <br />
          
          <button
            disabled={!isFormValid}
            type="submit"
            hidden={!isFormValid}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Book
          </button>
        </form>
        <h3>Already have account?<Link href="/form">Login</Link></h3>
        
      </div>
    </div>
  );
}

export default Proform;
