"use client";
import { useState,useEffect } from "react";
import { useRouter,useParams } from "next/navigation";
import { updateRecord,getRecordById } from "@/app/services/api";

export default function EditProfilePage() {
    const { id } = useParams(); 
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        phno: "",
        email: "",
        address: "",
        username: "",
        password:""
    });
    useEffect(()=>{
        fetchUser();
    }
    ,[id]);
    const fetchUser = async () => {
        try {
            console.log("User ID:", id);
            const data = await getRecordById(id);
            setFormData(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await updateRecord(id,formData);
            router.back(); 
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-1/3">
                <h1 className="text-2xl font-semibold text-center mb-5">Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded mb-3" />
                    <input type="text" name="phno" value={formData.phno} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded mb-3" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded mb-3" />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded mb-3" />
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full p-2 border rounded mb-3" />
                    
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
