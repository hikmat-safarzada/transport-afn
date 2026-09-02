"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, CarFront, CalendarDays, MapPin, Phone, Mail } from "lucide-react"


function MobileMenu({ user, onLogout, homePage=false }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Əsas səhifə" },
    { href: "/cars", label: "İcarə maşınlar" },
    { href: "/about", label: "Şirkət haqqında" },
    { href: "/terms", label: "Şərtlər" },
    { href: "/contact", label: "Əlaqə" },
  ]

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-2xl">
        <img src={homePage ? "/images/homemenu.png" : "/images/ci_menu-alt-05.png"} alt="Menu" />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="hidden md:flex flex-col justify-between w-1/3 bg-gray-100 py-12">
            
            <div className="flex justify-center">
              <img 
                src="/images/black.png" 
                alt="AFN Logo" 
                className="w-48 h-auto object-contain" 
              />
            </div>
            
            <div className="flex justify-center px-8">
              <img 
                src="/images/mobile.png" 
                alt="Mobile App" 
                className="w-full opacity-3 scale-150 h-auto object-contain drop-shadow-lg transition-all" 
              />
            </div>
            
            <div className="flex justify-center text-sm text-gray-700 font-medium">
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <MapPin size={20} className="text-black" /> 
                  Bakı ş., Xocalı pr.13
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={20} className="text-black" /> 
                  (+994) 50 394 91 94
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={20} className="text-black" /> 
                  (+994) 12 490 11 64
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={20} className="text-black" /> 
                  info@afn.az
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-white relative overflow-y-auto">
            
            <img 
              src="/thumbs/nissan.jpeg" 
              alt="Menu Background" 
              className="absolute inset-0 w-full h-full object-cover z-0" 
            />
            
            <div className="absolute inset-0 bg-[#282828]/85 z-0" />

            <div className="relative z-10 min-h-full">
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-[50px] right-[100px] text-3xl hover:text-gray-400 transition cursor-pointer"
              >
                ✕
              </button>

              <div className="pl-[100px]">
                
                <div className="flex gap-[60px] pt-[120px] mb-[40px] text-[28px] font-semibold">
                  <span className="border-b-2 border-orange-500 pb-1 cursor-pointer">AZ</span>
                  <span className="text-gray-400 cursor-pointer hover:text-white transition">EN</span>
                  <span className="text-gray-400 cursor-pointer hover:text-white transition">RU</span>
                </div>

                <nav className="flex flex-col gap-[24px]">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href

                    return (
                      <Link 
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-[28px] md:text-3xl font-normal transition w-fit pb-1 border-b-2 ${
                          isActive 
                            ? "border-orange-500 text-orange-500 font-semibold" 
                            : "border-transparent text-white hover:text-orange-500 hover:border-orange-500"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>

                {user && (
                  <div className="mt-10 pt-8 pb-12 border-t border-gray-700 w-[70%] flex flex-col gap-[24px]">
                    {user.role === "owner" && (
                      <Link
                        href="/owner/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 text-2xl font-bold text-[#F36F20] hover:text-orange-400 transition"
                      >
                        <CarFront size={28} />
                        Avtomobilləriniz
                      </Link>
                    )}

                    {user.role === "renter" && (
                      <Link
                        href="/renter/bookings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 text-2xl font-bold text-[#F36F20] hover:text-orange-400 transition"
                      >
                        <CalendarDays size={28} />
                        İcarələrim
                      </Link>
                    )}

                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center gap-3 text-2xl font-bold text-red-500 hover:text-red-400 transition text-left w-fit"
                    >
                      <LogOut size={28} />
                      Çıxış
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu