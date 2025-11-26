import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name, role);
      navigate("/dashboard");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="w-full h-screen flex">

      {/* LEFT SIDE (same structure as login) */}
      <div className="w-1/2 h-full bg-gradient-to-br from-emerald-300 via-teal-400 to-emerald-700 flex items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
          Create Your Account
        </h1>
      </div>

      {/* RIGHT SIDE - REGISTER */}
      <div className="w-1/2 h-full bg-emerald-950 flex items-center justify-center p-6">

        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Register
          </h2>

          {err && (
            <div className="text-red-300 bg-red-900/30 p-3 rounded mb-4 text-sm text-center">
              {err}
            </div>
          )}

          <form onSubmit={submit}>
            <input
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-emerald-300 focus:bg-white/30 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-emerald-300 focus:bg-white/30 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              type="password"
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-emerald-300 focus:bg-white/30 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <input
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-emerald-300 focus:bg-white/30 transition"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role (Admin / User)"
            />

            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold p-3 rounded-lg shadow-md transition-all"
            >
              Register
            </button>
          </form>

          <p className="text-gray-300 text-center mt-6 text-sm">
            Already have an account?{" "}
            <span
              className="text-emerald-300 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
