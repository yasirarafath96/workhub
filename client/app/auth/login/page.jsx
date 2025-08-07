"use client";

import { endpoints } from "@/api/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import LoginForm from "@/components/LoginForm";
import pokemon from '../../../asset/images/pokemon.png'
import Image from "next/image";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Page() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, accessToken, login } = useAuth();
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
    <div className="min-h-screen flex">
      <div className="w-1/3 h-screen hidden md:block relative">
        <Image src={pokemon} alt="Pokemon" fill className="object-cover" />
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl hover:shadow-blue-300 transition duration-300 ease-in-out p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-blue-700">
              Welcome to Pomni
            </h1>
            <p className="text-gray-600 mt-2">
              Elevate your productivity — smart task & project management made
              effortless.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
