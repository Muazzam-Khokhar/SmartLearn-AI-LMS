import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"

export default function login (){
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("");

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault();
    try{
      await login(email,password);
      navigate("/dashboard");
    }catch(error){
      setErr(error?.response?.data?.message || "Login Failed")
    }
  }
  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit}>
        <input className="w-full p-2 mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full p-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-blue-600 text-white p-2">Login</button>
      </form>
    </div>
  );
}

