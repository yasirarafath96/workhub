"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "@/api/endpoints";
import axiosInstance from "@/api/axios";
import { GetUserDetails } from "@/api/queries/user";
import { useAuth } from "@/context/authContext";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, accessToken } = useAuth();

  console.log('user id -----------', user?.id);

  const fetchUser = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const response = await GetUserDetails(user?.id);
      setProfile(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      age: user?.age || "",
      gender: user?.gender || ""
    }
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:3000/api/user/${user?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-black">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-gray-900">
            Profile Details
          </h2>
          <button
            onClick={() => {
              setEditMode(!editMode);
              reset(user);
            }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
          >
            <Pencil size={18} />
            <span>{editMode ? "Cancel" : "Edit"}</span>
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              disabled={!editMode}
              className={`w-full border text-gray-800 border-gray-300 rounded-md px-3 py-2 mt-1 ${editMode
                ? "focus:border-blue-500 focus:ring-blue-500"
                : "bg-gray-100 cursor-not-allowed"
                }`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              disabled={!editMode}
              className={`w-full border text-gray-800 border-gray-300 rounded-md px-3 py-2 mt-1 ${editMode
                ? "focus:border-blue-500 focus:ring-blue-500"
                : "bg-gray-100 cursor-not-allowed"
                }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              disabled={!editMode}
              className={`w-full border text-gray-800 border-gray-300 rounded-md px-3 py-2 mt-1 ${editMode
                ? "focus:border-blue-500 focus:ring-blue-500"
                : "bg-gray-100 cursor-not-allowed"
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              {...register("age")}
              disabled={!editMode}
              className={`w-full border text-gray-800 border-gray-300 rounded-md px-3 py-2 mt-1 ${editMode
                ? "focus:border-blue-500 focus:ring-blue-500"
                : "bg-gray-100 cursor-not-allowed"
                }`}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register("gender")}
              disabled={!editMode}
              className={`w-full border text-gray-800 border-gray-300 rounded-md px-3 py-2 mt-1 ${editMode
                ? "focus:border-blue-500 focus:ring-blue-500"
                : "bg-gray-100 cursor-not-allowed"
                }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {editMode && (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}