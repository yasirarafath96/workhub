"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ isOpen, onClose, onLogout }) {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div
      className={`${isOpen ? "w-64" : "w-0"
        } transition-all duration-300 ease-in-out bg-white border-r shadow-md overflow-hidden`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-black">Sidebar</h2>
        <button
             onClick={onClose}
          className="text-gray-600 hover:text-red-500 text-xl"
        >
          ✕
        </button>
      </div>

      <ul className="px-4 py-6 space-y-3 text-gray-700">
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => handleNavigate("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/profile")}
        >
          Profile
        </li>
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/task")}
        >
          Task
        </li>
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/project")}
        >
          Project
        </li>
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}
