"use client";

import Image from "next/image";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBullhorn,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Footer from "../../components/layout/Footer";
import Link from "next/link";

function Contact() {
  return (
    <>
      <section className="w-full bg-white">
        <div className="w-full">
          <div className="relative w-full bg-[#f4f4f4] bg-[url(/images/map.png)] bg-cover bg-center bg-no-repeat grid grid-cols-1 lg:grid-cols-12 items-stretch">

            <div className="lg:col-span-5 bg-[#121212] flex flex-col justify-between w-full">

              <div className="w-full h-24 bg-[#121212] px-8 sm:px-12 lg:px-16 flex items-center justify-start border-b-2 border-gray-800">
                <div className="relative w-60 h-16">
                  <Link href={"/"}>
                    <Image
                      src="/images/headerlogo.png"
                      alt="AFN Rent a Car"
                      fill
                      priority
                      className="object-contain object-left"
                    />
                  </Link>
                </div>
              </div>

              <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[500px]">
                <Image
                  src="/images/gallery.jpg"
                  alt="AFN Transport Gallery"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

            </div>

          
            <div className="lg:col-span-7 flex flex-col w-full border-t lg:border-t-0 lg:border-l border-gray-300">
              <div className="w-full h-24 px-8 sm:px-12 lg:px-16 flex items-center justify-end border-b-2 border-gray-300">
              </div>

              <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
                  Əlaqə
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <FaPhoneAlt className="text-[#F36F20] text-xl shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">Telefon</h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        (+994) 50 394 91 94 <br />
                        (+994) 12 490 11 64
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <FaMapMarkerAlt className="text-[#F36F20] text-xl shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">Ünvan</h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        Bakı şəhəri, Xocalı pr.13
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <FaEnvelope className="text-[#F36F20] text-xl shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">Email</h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        info@afn.az
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <FaBullhorn className="text-[#F36F20] text-xl shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-sm mb-2">Sosial şəbəkələr</h3>
                      <div className="flex items-center gap-2">
                        <a
                          href="#"
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#F36F20] hover:border-[#F36F20] transition duration-200"
                        >
                          <FaFacebookF className="text-xs" />
                        </a>
                        <a
                          href="#"
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#F36F20] hover:border-[#F36F20] transition duration-200"
                        >
                          <FaInstagram className="text-xs" />
                        </a>
                        <a
                          href="#"
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#F36F20] hover:border-[#F36F20] transition duration-200"
                        >
                          <FaTelegramPlane className="text-xs" />
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;