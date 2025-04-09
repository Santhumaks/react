"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    getRecordById,
    getProjectsByUserId,
    addNewProject,
    getMeetingsByUser,
} from "@/app/services/api";
import ValidatedInput from "@/app/validinput/page";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phno: string;
    address: string;
}

interface Project {
    id: number;
    project_title: string;
    project_description: string;
    project_duration: number;
    budget: number;
    user: number;
}

interface Meeting {
    project: number;
    meeting_date: string;
    meeting_time: string;
    meeting_status: string;
}

export default function DashboardPage() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [dashMain, setDash] = useState("profile");
    const [showAddProjectForm, setShowAddProjectForm] = useState(false);

    const [projectTitle, setProjectTitle] = useState("");
    const [isProjectTitleValid, setIsProjectTitleValid] = useState(false);

    const [projectDescription, setProjectDescription] = useState("");
    const [isProjectDescriptionValid, setIsProjectDescriptionValid] = useState(false);

    const [projectDuration, setProjectDuration] = useState("");
    const [isProjectDurationValid, setIsProjectDurationValid] = useState(false);

    const [budget, setBudget] = useState("");
    const [isBudgetValid, setIsBudgetValid] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchUser();
        fetchProjects();
        fetchMeetings();
    }, [id]);

    const fetchUser = async () => {
        try {
            const data = await getRecordById(id);
            setUser(data);
        } catch (error) {
            router.push("/form");
        }
    };

    const fetchProjects = async () => {
        try {
            const data = await getProjectsByUserId(id);
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchMeetings = async () => {
        try {
            const data = await getMeetingsByUser(id);
            setMeetings(Array.isArray(data) ? data : []);
            console.log("Meetings:", data);
        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
    };

    const getScheduledDatetime = (projectId: number) => {
        if (!Array.isArray(meetings)) return "Not scheduled";

        const meeting = meetings.find(
            (m) => m.project === projectId && m.meeting_status === "scheduled"
        );
        return meeting ? `${meeting.meeting_date} ${meeting.meeting_time}` : "Not scheduled";
    };

    const handleAddProject = async () => {
        if (!isProjectTitleValid || !isProjectDescriptionValid || !isProjectDurationValid || !isBudgetValid) {
            alert("Please fill out all fields correctly!");
            return;
        }

        try {
            const projectData = {
                project_title: projectTitle,
                project_description: projectDescription,
                project_duration: Number(projectDuration),
                budget: Number(budget),
                user: Number(id),
            };
            await addNewProject(projectData);
            alert("Project assigned successfully!");
            fetchProjects();
            resetForm();
            setShowAddProjectForm(false);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const resetForm = () => {
        setProjectTitle("");
        setIsProjectTitleValid(false);
        setProjectDescription("");
        setIsProjectDescriptionValid(false);
        setProjectDuration("");
        setIsProjectDurationValid(false);
        setBudget("");
        setIsBudgetValid(false);
    };

    const handlechange = (e: any) => {
        const { name, value } = e.target;
        switch (name) {
            case "project_title":
                setProjectTitle(value);
                break;
            case "project_description":
                setProjectDescription(value);
                break;
            case "project_duration":
                setProjectDuration(value);
                break;
            case "budget":
                setBudget(value);
                break;
        }
    };

    const logout = () => {
        setUser(null);
        router.push("/form");
    };

    return (
        <div className="flex h-screen">
            <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <nav className="mt-5">
                    <ul>
                        <li className="py-2 px-4 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setDash("profile")}>Profile</li>
                        <li className="py-2 px-4 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setDash("project")}>Projects</li>
                    </ul>
                </nav>
            </div>

            <div className="flex-1 p-5 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-2xl">Welcome to Dashboard, {user?.name}</h1>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
                </div>

                {dashMain === "profile" && (
                    <div className="mt-10 mx-auto text-center bg-gray-100 rounded-md w-3/4 p-10">
                        <h1 className="font-semibold text-2xl">Your Profile</h1>
                        <p className="pt-5">User ID: {id}</p>
                        <p>Full name: {user?.name}</p>
                        <p>Phone number: {user?.phno}</p>
                        <p>Email: {user?.email}</p>
                        <p>Address: {user?.address}</p>
                        <p>Username: {user?.username}</p>
                        <button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push(`/form/dashboard/useredit/${id}`)}>Edit</button>
                    </div>
                )}

                {dashMain === "project" && (
                    <div className="mt-10 mx-auto bg-gray-100 rounded-md w-3/4 p-10">
                        <h1 className="font-semibold text-2xl text-center">Your Projects</h1>

                        {projects.length > 0 ? (
                            <table className="w-full mt-5 border-collapse border border-black">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className="border p-2">Title</th>
                                        <th className="border p-2">Description</th>
                                        <th className="border p-2">Duration (months)</th>
                                        <th className="border p-2">Budget</th>
                                        <th className="border p-2">Scheduled Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id} className="text-center bg-blue-200">
                                            <td className="border p-2 hover:bg-black hover:text-white">{project.project_title}</td>
                                            <td className="border p-2 hover:bg-black hover:text-white">{project.project_description}</td>
                                            <td className="border p-2 hover:bg-black hover:text-white">{project.project_duration}</td>
                                            <td className="border p-2 hover:bg-black hover:text-white">₹{project.budget}</td>
                                            <td className="border p-2 hover:bg-black hover:text-white">{getScheduledDatetime(project.id)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-600 mt-5">No projects assigned yet.</p>
                        )}

                        <div className="mt-10">
                            <button onClick={() => setShowAddProjectForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
                                Add Project
                            </button>

                            {showAddProjectForm && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white rounded-lg p-8 w-1/2">
                                        <h2 className="text-xl font-semibold mb-4">Assign a New Project</h2>
                                        <form onChange={handlechange}>
                                            <ValidatedInput
                                                label="Project Title"
                                                name="project_title"
                                                placeholder="Enter project title"
                                                pattern=".{3,}"
                                                errmsg="Title must contain at least 3 characters"
                                                required={true}
                                                onValidChange={setIsProjectTitleValid}
                                            />
                                            <ValidatedInput
                                                label="Project Description"
                                                name="project_description"
                                                placeholder="Enter project description"
                                                pattern=".{30,}"
                                                errmsg="Description must contain at least 30 characters"
                                                required={true}
                                                onValidChange={setIsProjectDescriptionValid}
                                            />
                                            <ValidatedInput
                                                label="Project Duration"
                                                name="project_duration"
                                                placeholder="Enter in months"
                                                pattern="^(?:[1-9]|[1-2][0-9]|30)$"
                                                errmsg="Enter a valid duration [1-30 months]"
                                                required={true}
                                                onValidChange={setIsProjectDurationValid}
                                            />
                                            <ValidatedInput
                                                label="Budget (₹)"
                                                name="budget"
                                                placeholder="Enter budget"
                                                pattern="^([2-9]\d{3,}|\d{5,})$"
                                                errmsg="Enter a valid numeric budget"
                                                required={true}
                                                onValidChange={setIsBudgetValid}
                                            />
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    onClick={() => setShowAddProjectForm(false)}
                                                    className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleAddProject}
                                                    className={`px-4 py-2 rounded text-white ${
                                                        isProjectTitleValid && isProjectDescriptionValid && isProjectDurationValid && isBudgetValid
                                                            ? "bg-green-600 hover:bg-green-700"
                                                            : "bg-gray-400 cursor-not-allowed"
                                                    }`}
                                                    disabled={!isProjectTitleValid || !isProjectDescriptionValid || !isProjectDurationValid || !isBudgetValid}
                                                >
                                                    Assign Project
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
