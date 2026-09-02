"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/ui/Hero";
import FilterBar from "@/components/ui/FilterBar";
import CarList from "@/components/ui/CarList";
import Pagination from "@/components/ui/Pagination";


export default function RenterDashboard() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Çıxış xətası:", error);
    }
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header onLogout={handleLogout}/>

      <Hero title="İcarəyə verilən avtomobillər"/>

      <main className="bg-gray-50">

        <section className="relative pb-16">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <FilterBar />

            <div className="mt-8">
              <CarList
                page={page}
                setTotalPages={setTotalPages}
              />
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}