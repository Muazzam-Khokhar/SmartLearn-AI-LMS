import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import animationData from '../assets/animations/login_signup_animation.json'
import Lottie from "lottie-react";
import { FiUser } from "react-icons/fi";
import { BsFillKeyFill , BsEyeFill, BsEyeSlashFill  } from "react-icons/bs";




export default function login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login Failed")
    }
  }
  const togglePassword = ()=>setShowPassword(!showPassword)
  return (
  <div className="w-full h-screen flex">

    <div className="w-1/2 h-full pb-40 bg-linear-to-br from-emerald-400 via-teal-500 to-emerald-700 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
        Welcome Back
      </h1>
      <div className="w-72 h-72 md:h-32">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>

    <div className="w-1/2 h-full bg-emerald-950 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 py-18 space-y-12 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20">

        <h2 className="text-5xl font-bold mb-10 text-center text-white">
          Login
        </h2>

        {err && (
          <div className="text-red-300 bg-red-900/30 p-2 rounded mb-3 text-sm text-center">
            {err}
          </div>
        )}

        <form onSubmit={submit}>
          <div className=" relative mb-12">
          <FiUser className=" absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl" />
          <input
            className="w-full p-2 pl-12 mt-1 border-0  text-white placeholder-gray-300 outline-none border-b-4 border-white/20 focus:border-emerald-300 focus:bg-white/30 transition bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          </div>
          <div className=" relative mb-12">
          <BsFillKeyFill className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl"/>
          <input
            type={showPassword?'text':'password'}
            className="w-full p-2 pl-12 mt-1 border-0  text-white placeholder-gray-300 outline-none border-b-4 border-white/20 focus:border-emerald-300 focus:bg-white/30 transition bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
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

          <button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold p-3 rounded-lg shadow-md transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-gray-300 text-center mt-6 text-sm">
          Don't have an account?{" "}
          <span className="text-emerald-300 hover:underline cursor-pointer" onClick={()=>navigate("/register")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  </div>
);
}

