import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Format email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(8, "Password minimal harus 8 karakter"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      console.log("Data Login:", data);
      
      alert("Login Berhasil! Mengalihkan...");

      navigate("/"); 
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Selamat Datang!</h1>
        <p className="text-gray-400 mt-3 text-base">Silakan login untuk melanjutkan</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
          <input
            {...register("email")}
            type="email"
            disabled={isLoading}
            className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all placeholder:text-slate-300 ${
              errors.email ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
            }`}
            placeholder="email@anda.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-2 pl-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            disabled={isLoading}
            className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all placeholder:text-slate-300 ${
              errors.password ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
            }`}
            placeholder="........"
          />
          {errors.password && <p className="text-red-500 text-xs mt-2 pl-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#832B49] text-white py-4 rounded-xl font-bold hover:bg-[#6a223b] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:bg-slate-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Memproses...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-sm text-center text-slate-500 pt-2">
          Belum punya akun? <Link to="/register" className="text-[#7B1D3F] font-bold hover:underline">Daftar</Link>
        </div>
      </form>
    </div>
  );
}