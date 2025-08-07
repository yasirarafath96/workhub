"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { endpoints } from "@/api/endpoints";
import { toast } from "react-hot-toast";
import profileBg from "@/asset/images/pokemon.png";
import Image from "next/image";

export default function OnboardPage() {
  const { user, accessToken } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: user?.name || "",
    age: "",
    gender: "",
    comments: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload Profile Picture
      if (file) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        await axios.post('http://localhost:3000/api/user/upload', formDataUpload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        });

        // console.log('response profile pic', response);

        toast.success("Profile picture uploaded!");
      }

      // Submit User Profile
      const response = await axios.post(
        'http://localhost:3000/api/user',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
          comments: formData.comments
            ? [{ body: formData.comments, date: new Date().toISOString() }]
            : [],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('response User Profile', response);

      toast.success("Profile created successfully!");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 400);

    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex">
      <div className="w-1/2 h-screen hidden md:block relative">
        <Image
          src={profileBg}
          alt="Profile Background"
          fill
          className="fill"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 hover:shadow-indigo-300 transition duration-300 ease-in-out">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Complete Your Profile
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div>
              <label className="block text-sm text-gray-700">First Name</label>
              <input
                name="firstName"
                className="w-full px-4 py-2 border rounded text-black"
                onChange={handleChange}
                value={formData.firstName}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Last Name</label>
              <input
                name="lastName"
                className="w-full px-4 py-2 border rounded text-black"
                onChange={handleChange}
                value={formData.lastName}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Age</label>
              <input
                name="age"
                type="number"
                className="w-full px-4 py-2 border rounded text-black"
                onChange={handleChange}
                value={formData.age}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                className="w-full px-4 py-2 border rounded text-black"
                onChange={handleChange}
                value={formData.gender}
                required
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700">Comments</label>
              <textarea
                name="comments"
                rows="3"
                className="w-full px-4 py-2 border rounded text-black"
                onChange={handleChange}
                value={formData.comments}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className=" px-4 py-2 text-neutral-700 border rounded"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 rounded-full object-cover border"
                />
              )}
            </div>

            <button
              type="submit"
              className={`bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
