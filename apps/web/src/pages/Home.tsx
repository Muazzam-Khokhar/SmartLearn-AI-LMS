import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to SmartLearn</h1>

      <div className="flex gap-3">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
