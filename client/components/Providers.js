"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/authContext";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const ToastConfig = {
  success: {
    style: {
      background: "#d1fae5",
      color: "#065f46",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#d1fae5",
    },
  },
  error: {
    style: {
      background: "#fee2e2",
      color: "#991b1b",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fee2e2",
    },
  },
};

export default function Providers({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster toastOptions={ToastConfig} />
    </>
  );
}
