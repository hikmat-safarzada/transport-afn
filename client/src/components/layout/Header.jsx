"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, LogOut, CarFront, CalendarDays } from "lucide-react";
import MobileMenu from "../ui/MobileMenu";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

function Header({ homePage = false }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await authService.getMe();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push("/");
    } catch (error) {
    }
  };

  return (
    <header
      className={`${
        homePage ? "bg-transparent text-black" : "bg-[#282828] text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-3.5">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img
              src={homePage ? "/images/homelogo.png" : "/images/headerlogo.png"}
              alt="AFN Logo"
              className="w-28 h-auto object-contain"
            />
          </Link>
        </div>

        <div
          className={`hidden md:flex items-center gap-6 text-sm ${
            homePage ? "text-black" : "text-gray-300"
          }`}
        >
          <span className="flex items-center gap-2">
            <MapPin
              size={16}
              className={homePage ? "text-black" : "text-[#F36F20]"}
            />
            Bakı ş., Xocalı pr.13
          </span>

          <span className="flex items-center gap-2">
            <Phone
              size={16}
              className={homePage ? "text-black" : "text-[#F36F20]"}
            />
            (+994) 50 394 91 94
          </span>

          <span className="flex items-center gap-2">
            <Phone
              size={16}
              className={homePage ? "text-black" : "text-[#F36F20]"}
            />
            (+994) 12 490 11 64
          </span>

          <span className="flex items-center gap-2">
            <Mail
              size={16}
              className={homePage ? "text-black" : "text-[#F36F20]"}
            />
            info@afn.az
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user.role === "owner" && (
                <Link
                  href="/owner/dashboard"
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                    homePage
                      ? "text-black hover:bg-black/10"
                      : "text-gray-300 hover:text-[#F36F20] hover:bg-[#F36F20]/10"
                  }`}
                  title="Avtomobilləriniz"
                >
                  <CarFront size={18} />
                </Link>
              )}

              {user.role === "renter" && (
                <Link
                  href="/renter/bookings"
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                    homePage
                      ? "text-black hover:bg-black/10"
                      : "text-gray-300 hover:text-[#F36F20] hover:bg-[#F36F20]/10"
                  }`}
                  title="İcarələrim"
                >
                  <CalendarDays size={18} />
                </Link>
              )}

              <button
                onClick={handleLogout}
                className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                  homePage
                    ? "text-black hover:text-red-500 hover:bg-red-500/10"
                    : "text-gray-300 hover:text-red-400 hover:bg-red-500/10"
                }`}
                title="Çıxış"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition ${
                  homePage
                    ? "text-black hover:text-[#F36F20]"
                    : "text-gray-300 hover:text-[#F36F20]"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-[#F36F20] text-white hover:bg-white hover:text-[#F36F20] border border-[#F36F20] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <MobileMenu user={user} onLogout={handleLogout} homePage={homePage} />
        </div>

      </div>
    </header>
  );
}

export default Header;