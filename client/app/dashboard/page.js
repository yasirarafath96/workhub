"use client";

import { GetAllProjects, GetAllTasks, GetAllUsers } from "@/api/queries/user";
import Adminpage from "@/components/AdminPage";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, accessToken } = useAuth();


  useEffect(() => {
    if (user) {
      // console.log('user', user);
      // console.log('user', user.email);
      // console.log('user', user.id);
      // console.log('user', user.name);
    }
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Welcome {user ? user.name : null}!</h2>
      <Adminpage></Adminpage>
    </div>
  );
}
