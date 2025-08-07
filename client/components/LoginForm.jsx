"use client";

import { endpoints } from "@/api/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const notify = () => toast.success("LoggedIn Successfully");
  const errornotify = () => toast.error("Error Logging In User");

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    console.log('data -> ', data.email, data.password);

    try {
      await login(data.email, data.password);
      notify();
    } catch (err) {
      console.log("err", err);
      setError(err.message);
      errornotify(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 mt-1"
          placeholder="Enter your Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 mt-1"
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors"
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
}
