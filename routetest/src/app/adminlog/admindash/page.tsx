"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAllRecords,
  softDeleteRecord,
  getAllProjects,
  softDeleteProject,
  getAllMeetings,
  createMeeting,
} from "@/app/services/api";
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

interface Meeting {
  id: number;
  project: number;
  meeting_date: string;
  meeting_time: string;
  meeting_status: string;
}

interface Meet {
  project: number;
  meeting_date: string;
  meeting_time: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const curdate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "projects") {
      fetchProjects();
    } else if (activeTab === "meeting") {
      fetchMeetings();
    }
  }, [activeTab]);

  useEffect(() => {
    if (!meetingDate || !meetingTime) {
      setIsSubmitDisabled(true);
      return;
    }

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const minAllowed = "09:00";
    const maxAllowed = "21:00";

    const isWithinTime = meetingTime >= minAllowed && meetingTime <= maxAllowed;
    const future = new Date(now.getTime() + 60 * 60000);
    const isFutureTime =
      meetingDate > today || (meetingDate === today && meetingTime > future.toTimeString().slice(0, 5));

    setIsSubmitDisabled(prev => !(isWithinTime && isFutureTime));
  }, [meetingDate, meetingTime]);

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

  const fetchMeetings = async () => {
    try {
      const data = await getAllMeetings();
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleMeetingSubmit = async () => {
    if (!meetingDate || !meetingTime || selectedProjectId === null) {
      alert("Please select a date and time");
      return;
    }

    const meetingData: Meet = {
      project: selectedProjectId,
      meeting_date: meetingDate,
      meeting_time: meetingTime,
    };

    try {
      await softDeleteProject(selectedProjectId, "Accepted");
      await createMeeting(meetingData);
      alert("Meeting scheduled and project accepted!");

      setShowMeetingForm(false);
      setMeetingDate("");
      setMeetingTime("");
      setSelectedProjectId(null);
      fetchProjects();
      fetchMeetings();
    } catch (error) {
      console.error("Error submitting meeting:", error);
      alert("Something went wrong");
    }
  };

  const deletepannuda = (id: number) => {
    alert("User has been deleted successfully");
    softDeleteRecord(id);
  };

  const deleteproject = (id: number, st: string) => {
    if (st === "Accepted") {
      setSelectedProjectId(id);
      setShowMeetingForm(true);
    } else if (st === "Declined") {
      alert("Project has been deleted successfully");
      softDeleteProject(id, st);
    }
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

        {/* USERS */}
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
                        onClick={() => deletepannuda(user.id)}
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

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div className="bg-white p-6 mt-5 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Duration<br />(months)</th>
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
                        onClick={() => deleteproject(project.id, "Accepted")}
                        className="mr-3 hover:text-blue-600 cursor-pointer"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => deleteproject(project.id, "Declined")}
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

        {/* MEETINGS */}
        {activeTab === "meeting" && (
          <div className="bg-white p-6 mt-5 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Scheduled Meetings</h2>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Project ID</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => (
                  <tr key={meeting.id} className="text-center">
                    <td className="border p-2">{meeting.id}</td>
                    <td className="border p-2">{meeting.project}</td>
                    <td className="border p-2">{meeting.meeting_date}</td>
                    <td className="border p-2">{meeting.meeting_time}</td>
                    <td className="border p-2">{meeting.meeting_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL */}
        {showMeetingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">Schedule Meeting</h3>
              <label className="block mb-2 text-sm">Meeting Date</label>
              <input
                type="date"
                value={meetingDate}
                min={curdate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full border px-3 py-2 mb-4 rounded"
              />

              <label className="block mb-2 text-sm">Meeting Time</label>
              <input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full border px-3 py-2 mb-4 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowMeetingForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleMeetingSubmit}
                  disabled={isSubmitDisabled}
                  className={`px-4 py-2 rounded transition ${
                    isSubmitDisabled
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
