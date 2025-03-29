"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllRecords, softDeleteRecord, getAllProjects,softDeleteProject} from "@/app/services/api";
import Link from "next/link";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Project {
    project_title: string;
    project_description: string;
    project_duration: number;
    budget: number;
    user: number;
    id: number;
}


export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]); 
    const [activeTab, setActiveTab] = useState("users"); 

    useEffect(() => {
        if (activeTab === "users") {
            fetchUsers();
        } else if (activeTab === "projects") {
            fetchProjects();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const data = await getAllRecords();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const data = await getAllProjects(); 
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const deletepannuda = (id: any) => {
        alert("User has been deleted successfully");
        softDeleteRecord(id);
    };
    const deleteproject = (id: any,st:string) => {
        if(st=="Accepted"){
            alert("Project has been accepted successfully");
          
        }
        else if(st=="Declined"){            
        alert("Project has been deleted successfully");
        }
        softDeleteProject(id,st);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
                <h2 className="text-xl font-semibold">Admin Panel</h2>
                <nav className="mt-5">
                    <ul>
                        <li
                            className={`py-2 px-4 hover:bg-gray-700 rounded cursor-pointer ${
                                activeTab === "users" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => setActiveTab("users")}
                        >
                            Users
                        </li>
                        <li
                            className={`py-2 px-4 hover:bg-gray-700 rounded cursor-pointer ${
                                activeTab === "projects" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => setActiveTab("projects")}
                        >
                            Projects Applications
                        </li>
                        <li
                            className={`py-2 px-4 hover:bg-gray-700 rounded cursor-pointer ${
                                activeTab === "meeting" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => setActiveTab("meeting")}
                        >
                            Project Meeting
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex-1 p-5">
                <div className="flex">
                    <h1 className="font-semibold text-2xl">Admin's Dashboard</h1>
                    <button
                        className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            router.push("/adminlog");
                        }}
                    >
                        Logout
                    </button>
                </div>
                {activeTab === "users" && (
                    <div className="bg-white p-6 mt-5 shadow-md rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Users</h2>
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="text-center">
                                        <td className="border p-2">{user.id}</td>
                                        <td className="border p-2">{user.name}</td>
                                        <td className="border p-2">{user.email}</td>
                                        <td className="border p-2 text-2xl">
                                            <Link
                                                href={`/form/dashboard/useredit/${user.id}`}
                                                className="mr-3 hover:text-blue-600"
                                            >
                                                ✏
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    deletepannuda(user.id);
                                                }}
                                                className="mr-3 hover:text-blue-600 cursor-pointer"
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "projects" && (
                    <div className="bg-white p-6 mt-5 shadow-md rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Title</th>
                                    <th className="border p-2">Description</th>
                                    <th className="border p-2">Duration<br/>(months)</th>
                                    <th className="border p-2">Budget</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="text-center">
                                        <td className="border p-2">{project.id}</td>
                                        <td className="border p-2">{project.project_title}</td>
                                        <td className="border p-2">{project.project_description}</td>
                                        <td className="border p-2">{project.project_duration}</td>
                                        <td className="border p-2">{project.budget}</td>
                                        <td className="border p-2 text-xl flex">
                                        <button
                                                onClick={() => {
                                                    deleteproject(project.id,"Accepted");
                                                }}
                                                className="mr-3 hover:text-blue-600 cursor-pointer"
                                            >
                                                 ✅
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteproject(project.id,"Declined");
                                                }}
                                                className="mr-3 hover:text-blue-600 cursor-pointer"
                                            >
                                                ❌ 
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "meeting" && (
                    <div className="bg-white p-6 mt-5 shadow-md rounded-lg">
                    <h1>Working on it..............</h1>
                    </div>
                )}
            </div>
        </div>
    );
}