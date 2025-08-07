'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { endpoints } from '@/api/endpoints';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/authContext';
import pomni_login from '../../../asset/images/pomni_login.jpg'
import Image from 'next/image';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Page() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const { success, message } = await signup(data.name, data.email, data.password);

      if (success) {
        toast.success("Sign up successful");
        router.replace('/onboard');
      } else {
        toast.error(message || "Signup failed");
        setError(message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src={pomni_login}
            alt="Signup Visual"
            fill
            style={{ objectFit: 'fill' }}
            priority
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Hi, let’s get started
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register('name')}
                className="w-full border text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 mt-1"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full border text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 mt-1"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full border text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 mt-1"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
