"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [adata, setadata] = useState({
    aname: "",
    apass: "",
  });

  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: any) => {
    setadata({
      ...adata,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-center text-xl text-blue-600 mb-6">ADMIN LOGIN</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1">UserName:</label>
          <input
            type="text"
            name="aname"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-1">Password:</label>
          <input
            type="password"
            name="apass"
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Back
          </button>

          <button
            onClick={() =>
              adata.aname === "santhu" && adata.apass === "santhu2005"
                ? router.push("/adminlog/admindash")
                : alert("Login failed")
            }
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
