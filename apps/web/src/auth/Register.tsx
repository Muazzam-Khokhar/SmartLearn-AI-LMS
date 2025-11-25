import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"

export default function register (){
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [err, setErr] = useState("");

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault();
    try{
      await register(email,password,name,role);
      navigate("/dashboard");
    }catch(error){
      setErr(error?.response?.data?.message || "Register Failed")
    }
  }
  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit}>
        <input className="w-full p-2 mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full p-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" className="w-full p-2 mb-2" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
        <input type="text" className="w-full p-2 mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <button className="w-full bg-blue-600 text-white p-2">Register</button>
      </form>
    </div>
  );
}

