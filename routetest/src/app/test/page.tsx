"use client";
import { useState } from "react";

export default function MeetingScheduler() {
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  const curDate = new Date().toISOString().split("T")[0];

  const now = new Date();
  const curTime = now.toTimeString().slice(0, 5);

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const isValidTime = () => {
    if (!meetingDate || !meetingTime) return false;

    const isToday = meetingDate === curDate;
    const isAfterNow = isToday ? meetingTime > curTime : true;

    return isAfterNow;
  };

  const handleSubmit = () => {
    if (!isValidTime()) {
      alert("Please select a valid date and time.");
      return;
    }

    console.log("Meeting scheduled on:", meetingDate, meetingTime);
    alert("Meeting Scheduled!");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Schedule a Meeting</h2>

        <label className="block mb-2 text-sm font-medium">Meeting Date</label>
        <input
          type="date"
          value={meetingDate}
          min={curDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        <label className="block mb-2 text-sm font-medium">Meeting Time</label>
        <select
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        >
          <option value="">Select a time</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={!isValidTime()}
          className={`w-full px-4 py-2 rounded ${
            isValidTime()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed text-white"
          }`}
        >
          Schedule
        </button>
      </div>
    </div>
  );
}
