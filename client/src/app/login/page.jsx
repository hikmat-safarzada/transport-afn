"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(formData);
      
      setIsNavigating(true);
      
      if (data.user.role === "owner") {
        router.push("/owner/dashboard");
      } else {
        router.push("/renter/dashboard");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setIsNavigating(false);
    } 
  };

  return (
    <>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <svg className="animate-spin h-12 w-12 text-[#F36F20] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-sm font-medium tracking-wide animate-pulse">
            Sistemə daxil olunur...
          </p>
        </div>
      )}

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
            <h2 className="text-2xl font-bold text-white">Daxil ol</h2>
            <p className="text-xs text-gray-400 mt-1">
              Hesabınıza daxil olmaq üçün məlumatları doldurun
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end items-center text-xs">
              <Link href="/forgot-password" className="text-gray-400 hover:text-[#F36F20] transition hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F36F20] hover:bg-[#d85e17] text-white p-3 rounded-lg text-xs font-semibold transition duration-200 disabled:opacity-50 shadow-md shadow-[#F36F20]/30 flex justify-center items-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wait...
                </>
              ) : (
                "Daxil Ol"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Hesabınız yoxdur?{" "}
            <Link href="/register" className="text-[#F36F20] font-semibold hover:underline">
              Qeydiyyatdan keçin
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}