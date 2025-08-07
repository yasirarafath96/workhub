"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import Image from "next/image";

import pokemon from "../../asset/images/pokemon.png";
import Menue from "@/components/Menue";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, accessToken, loading, login, logout } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("user", user);
      console.log("user", user.email);
      console.log("user", user.id);
      console.log("user", user.name);
    }
  }, []);

  const handleLogoutConfirmed = () => {
    console.log("Logging out...");
    logout();
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="flex w-[14%] md:w-[8%] bg-yellow-50  lg:w-[16%] xl:w-[14%] flex-col">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2 p-2"
          >
            <Image
              src={pokemon}
              alt=""
              className="h-12 w-12 contain-cover"
            ></Image>
            <span className="text-black hidden lg:block">Zono Cliq</span>
          </Link>

          <Menue
            handleLogoutConfirmed={handleLogoutConfirmed}
            triggerLogoutModal={() => setShowLogoutModal(true)}
          />
        </div>
        <div className="flex w-[86%]  md:w-[92%] lg:w-[84%] xl:w-[86%] bg-white overflow-scroll flex-col">
          <Navbar />
          {children}
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogoutConfirmed();
                }}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>  
          </div>
        </div>
      )}
    </>
  );
}
