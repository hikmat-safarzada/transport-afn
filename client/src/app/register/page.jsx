"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "renter",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.register(formData);
      router.push("/login?registered=true");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/gallery.jpg')" }}
    >
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 max-w-md w-full bg-[#1c1d21]/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700/50">
        
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-2">
            <Image
              src="/images/headerlogo.png"
              alt="AFN Rent a Car"
              width={110}
              height={35}
              className="object-contain mx-auto"
            />
          </Link>
          <h2 className="text-2xl font-bold text-white">Qeydiyyat</h2>
          <p className="text-xs text-gray-400 mt-1">
            Platformadan istifadə üçün məlumatları doldurun
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="hikmet123"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Account type</label>
            <select
              className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="renter" className="bg-[#151619] text-white">İcarəçi (Renter)</option>
              <option value="owner" className="bg-[#151619] text-white">Avtomobil Sahibi (Owner)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F36F20] hover:bg-[#d85e17] text-white p-3 rounded-lg text-xs font-semibold transition duration-200 disabled:opacity-50 shadow-md shadow-[#F36F20]/30"
          >
            {loading ? "Gözləyin..." : "Qeydiyyatı Tamamla"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Artıq hesabınız var?{" "}
          <Link href="/login" className="text-[#F36F20] font-semibold hover:underline">
            Daxil ol
          </Link>
        </p>

      </div>
    </div>
  );
}