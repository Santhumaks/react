"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllRecords } from "../services/api";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phno: string;
  address: string;
  status: boolean;
}

export default function Admin() {
  const [usdata, setusdata] = useState({
    usname: "",
    uspass: "",
  });

  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: any) => {
    setusdata({
      ...usdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleLog = async (e: any) => {
    if (!usdata.usname || !usdata.uspass) {
      alert("Both Username and Password are required!");
      return;
    }

    try {
      const response = await getAllRecords();
      const filteredUser: User = response.find(
        (user: User) => user.username === usdata.usname
      );

      if (filteredUser.password === usdata.uspass) {
        alert("Login success");
        router.push(`/form/dashboard/${filteredUser.id}`);
      } else {
        alert("Password Incorrect");
      }
    } catch (error: any) {
      alert("User not found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-center text-xl text-blue-600 mb-6">USER LOGIN</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1">Username:</label>
          <input
            type="text"
            name="usname"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-1">Password:</label>
          <input
            type="password"
            name="uspass"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Back
          </button>
          <button
            onClick={handleLog}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link href="/registerform" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
