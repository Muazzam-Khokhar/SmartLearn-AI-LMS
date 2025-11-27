import { createContext , useContext , ReactNode , useState, useEffect, Children} from 'react'
import api from '../api/api'
import type { User } from "../types/user"

type AuthContextType = {
  user: User | "";
  token: string | "";
  login: (email:string,password:string)=>Promise<void>;
  register:(email:string,password:string,name:string,role:string)=>Promise<void>;
  logout: void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children:ReactNode})=>{
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    if(token){
      api.get("/api/auth/me").then((res)=>setUser(res.data.user)).catch(()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem("token");
      })
    }
  }, [token])
  const login =  async(email:string,password:string)=>{
    const res = await api.post("/api/auth/login",{email,password});
    const t = res.data.token;
    localStorage.setItem("token",t);

    const me = await api.get("/api/auth/me");
    setUser(me.data.user)
  }
  const register = async (email:string,password:string,name:string,role:string)=>{
    await api.post("/api/auth/register",{email,password,name,role})

    await login(email,password)
  }

  const logout = ()=>{
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  return <AuthContext.Provider value={{user,token,login,register,logout}}>{children}</AuthContext.Provider>
};

export const useAuth = () =>{
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
