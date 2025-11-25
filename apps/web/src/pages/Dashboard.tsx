import React from "react";
import { useAuth } from "../auth/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg">Welcome, {user?.email || "User"} 👋</p>
      </div>

      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
