"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const NAV_LINKS = [
  { title: "Əsas səhifə", href: "/" },
  { title: "İcarə maşınlar", href: "/login" },
  { title: "Haqqımızda", href: "/about" },
  { title: "Suallar", href: "/faq" },
  { title: "Əlaqə", href: "/contact" },
];

const CATEGORY_LINKS = [
  { title: "Econom class", href: "/cars?category=economy" },
  { title: "Business class", href: "/cars?category=business" },
  { title: "Crossover & SUVs", href: "/cars?category=suv" },
  { title: "Premium class", href: "/cars?category=premium" },
  { title: "Buses & Minivans", href: "/cars?category=minivan" },
];

function Footer() {
  return (
    <footer className="relative w-full bg-[#121417] text-gray-300 py-6 px-4 sm:px-8 lg:px-16 border-t border-gray-800/60 mt-0 overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Link href={"/"}>
          <Image
            src="/images/footer.jpg"
            alt="Footer background"
            fill
            className="object-cover object-center"
            priority
          />
        </Link>
      </div>

      <div className="absolute inset-0 bg-[#121417]/75 z-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto max-w-7xl flex flex-col justify-between">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-2 items-start">

          <div className="lg:col-span-3 flex justify-start items-start">
            <Link href="/" className="relative w-48 h-16 lg:w-56 lg:h-20 opacity-90 hover:opacity-100 transition-opacity">
              <Image
                src="/images/image.png"
                alt="AFN Rent A Car Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <ul className="space-y-2 text-sm sm:text-base text-gray-300/90">
              {NAV_LINKS.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 hover:text-[#F36F20] transition-colors">
                  <span className="w-1.5 h-1.5 bg-[#F36F20] rounded-full shrink-0"></span>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ul className="space-y-2 text-sm sm:text-base text-gray-300/90">
              {CATEGORY_LINKS.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 hover:text-[#F36F20] transition-colors">
                  <span className="w-1.5 h-1.5 bg-[#F36F20] rounded-full shrink-0"></span>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-2.5 text-sm sm:text-base text-gray-300/90">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#F36F20] shrink-0" />
              <span>Bakı şəhəri, Xocalı pr.13</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#F36F20] shrink-0" />
              <a href="tel:+994503949194" className="hover:text-[#F36F20] transition-colors">
                (+994) 50 394 91 94
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#F36F20] shrink-0" />
              <a href="tel:+994124901164" className="hover:text-[#F36F20] transition-colors">
                (+994) 12 490 11 64
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#F36F20] shrink-0" />
              <a href="mailto:info@afn.az" className="hover:text-[#F36F20] transition-colors">
                info@afn.az
              </a>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col items-start lg:items-start gap-2">
            <p className="text-gray-200 font-medium text-sm sm:text-base whitespace-nowrap">
              Bizi izləyin
            </p>
            <div className="flex items-center gap-3 pt-0.5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#F36F20] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#F36F20] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#F36F20] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.321.016.104.032.339.017.525z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="w-full h-[1px] bg-gray-800/80 my-1.5"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 pt-1 pb-0 text-xs sm:text-sm text-gray-400/80 text-center sm:text-left leading-none">
          <p>© AFN Transport - 2021. Müəllif hüquqları qorunur.</p>
          <p>Sayt Hikmət tərəfindən yaradılmışdır.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;