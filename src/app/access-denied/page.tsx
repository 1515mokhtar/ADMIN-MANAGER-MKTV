"use client";

import { useRouter } from "next/navigation";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          You don&apos;t have permission to access this page. Please contact the administrator.
        </p>
        <button
          onClick={() => router.push("/auth/sign-in")}
          className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
} 