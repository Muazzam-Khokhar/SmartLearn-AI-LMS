import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import animationData from '../assets/animations/login_signup_animation.json';
import Lottie from "lottie-react";

import { FiUser } from "react-icons/fi";
import { BsFillKeyFill, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FaUserTag } from "react-icons/fa";
import Select from "react-select";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const options = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];

  const togglePassword = () => setShowPassword(!showPassword);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name || !role) {
      setErr("All fields must be filled");
      return;
    }

    try {
      const user = await register(email, password, name, role);
      if(user.role==="admin") navigate("/admin");
      if(user.role==="teacher") navigate("/teacher");
      else navigate("/student");
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="w-full h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 pb-40 h-full bg-linear-to-br from-emerald-400 via-teal-500 to-emerald-700 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
          Create Your Account
        </h1>
        <div className="w-72 h-72 md:h-32">
          <Lottie animationData={animationData} loop autoplay />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 h-full bg-emerald-950 flex items-center justify-center p-6">

        <div className="bg-white/10 backdrop-blur-lg p-10 py-10 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20">

          <h2 className="text-5xl font-bold mb-8 text-center text-white">
            Register
          </h2>

          {err && (
            <div className="text-red-300 bg-red-900/30 p-2 rounded mb-3 text-sm text-center">
              {err}
            </div>
          )}

          <form onSubmit={submit}>

            {/* FULL NAME */}
            <div className="relative mb-6">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl" />
              <input
                className="w-full p-2 pl-12 mt-1 text-white placeholder-gray-300 bg-transparent border-b-4 border-white/20 outline-none focus:border-emerald-300 focus:bg-white/30 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
            </div>

            {/* EMAIL */}
            <div className="relative mb-6">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl" />
              <input
                className="w-full p-2 pl-12 mt-1 text-white placeholder-gray-300 bg-transparent border-b-4 border-white/20 outline-none focus:border-emerald-300 focus:bg-white/30 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative mb-6">
              <BsFillKeyFill className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 pl-12 mt-1 text-white placeholder-gray-300 bg-transparent border-b-4 border-white/20 outline-none focus:border-emerald-300 focus:bg-white/30 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {showPassword ? (
                <BsEyeFill
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 text-xl cursor-pointer"
                  onClick={togglePassword}
                />
              ) : (
                <BsEyeSlashFill
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 text-xl cursor-pointer"
                  onClick={togglePassword}
                />
              )}
            </div>

            {/* ROLE SELECT */}
            <div className="relative mb-6">
              <FaUserTag className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl z-10" />
              <Select
                value={options.find((o) => o.value === role)}
                onChange={(selected) => setRole(selected!.value)}
                options={options}
                placeholder="Select role"
                styles={{
                  control: (base) => ({
                    ...base,
                    background: "transparent",
                    border: "none",
                    borderBottom: "4px solid rgba(255,255,255,0.2)",
                    borderRadius: 0,
                    paddingLeft: "2.5rem",
                    paddingTop: "0.25rem",
                    paddingBottom: "0.25rem",
                    color: "white",
                    boxShadow: "none",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "white",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "rgba(0, 33, 26, 1)",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "rgba(5,150,105,0.4)"
                      : "rgba(255,255,255,0.15)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(5,150,105,0.9)",
                    },
                  }),
                }}
              />
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold p-3 rounded-lg shadow-md transition-all">
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
