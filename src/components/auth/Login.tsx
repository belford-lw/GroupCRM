import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, LogIn, ShieldCheck } from "lucide-react"; 


const Login = () => {
  const [login, setLogin] = useState<string>("admin");
  const [password, setPassword] = useState<string>("admin123");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === "admin" && password === "admin123") {

      navigate("/admin");
    } else {
      alert("Login yoki password xato!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md p-1">
        <div className="bg-linear-to-b from-blue-500/20 to-transparent p-px rounded-[32px]">
          
          <div className="bg-[#0f172a]/80 backdrop-blur-xl text-white p-10 rounded-[31px] shadow-2xl border border-white/5">
            
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/30 mb-4 shadow-inner">
                <ShieldCheck className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                CRM Portal
              </h1>
              <p className="text-gray-500 mt-2 text-sm">Xush kelibsiz, tizimga kiring</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="group relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Admin Login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-[#1e293b]/50 text-white rounded-2xl border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Parol"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-[#1e293b]/50 text-white rounded-2xl border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600"
                />
              </div>

              <button
                type="submit"
                className="group relative w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-[0.97] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Kirish <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </form>

            <div className="mt-10 text-center border-t border-white/5 pt-6">
              <p className="text-gray-600 text-[12px] uppercase tracking-widest font-medium">
                © react tsx group
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;