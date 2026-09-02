"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle,
  Clock,
  User,
  XCircle,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/layout/Footer";
import { getOwnerBookings } from "@/services/api.service";

const STATUS_MAP = {
  confirmed: {
    label: "Aktiv",
    icon: CheckCircle,
    className: "bg-green-50 text-green-600 border-green-200",
  },
  pending: {
    label: "Gözləyir",
    icon: Clock,
    className: "bg-orange-50 text-[#F36F20] border-orange-200",
  },
  completed: {
    label: "Tamamlandı",
    icon: CheckCircle,
    className: "bg-blue-50 text-blue-600 border-blue-200",
  },
  cancelled: {
    label: "Ləğv edildi",
    icon: XCircle,
    className: "bg-red-50 text-red-500 border-red-200",
  },
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("az-AZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("active");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getOwnerBookings();
        setBookings(data.bookings || []);
      } catch (err) {
        setError("İcarələri yükləmək mümkün olmadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "active") {
      return booking.status === "confirmed" || booking.status === "pending";
    }
    if (filter === "completed") {
      return booking.status === "completed";
    }
    if (filter === "cancelled") {
      return booking.status === "cancelled";
    }
    return true;
  });

  const filters = [
    {
      key: "active",
      label: "Aktiv",
      count: bookings.filter(
        (booking) =>
          booking.status === "confirmed" || booking.status === "pending"
      ).length,
    },
    {
      key: "completed",
      label: "Tamamlanmış",
      count: bookings.filter((booking) => booking.status === "completed").length,
    },
    {
      key: "cancelled",
      label: "Ləğv edilmiş",
      count: bookings.filter((booking) => booking.status === "cancelled").length,
    },
  ];

  return (
    <>
      <Header />

      <Hero title="İcarələr" />

      <main className="min-h-screen bg-[#f3f4f6]">
        <div className="max-w-[90rem] mx-auto px-4 py-8 sm:px-6 lg:px-8">
          
          {/* PAGE HEADER */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/owner/reviews"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#F36F20] transition-colors"
            >
              Rəylərə bax
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/owner/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#F36F20] transition-colors"
            >
              <ArrowLeft size={17} />
              Avtomobillərimə qayıt
            </Link>
          </div>

          {/* FILTERS */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-gray-200 rounded-xl shadow-sm">
              {filters.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    filter === item.key
                      ? "bg-[#F36F20] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                  <span
                    className={`ml-2 text-xs ${
                      filter === item.key ? "text-white/80" : "text-gray-400"
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

        
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-[3px] border-gray-200 border-t-[#F36F20] rounded-full animate-spin" />
            </div>
          )}

    
          {!loading && error && (
            <div className="max-w-xl mx-auto p-4 text-center bg-red-50 border border-red-200 rounded-xl text-sm text-red-500">
              {error}
            </div>
          )}

  
          {!loading && !error && filteredBookings.length === 0 && (
            <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
              <CalendarDays
                size={32}
                className="mx-auto mb-4 text-gray-400"
              />
              <h3 className="text-base font-semibold text-gray-900">
                İcarə tapılmadı
              </h3>
            </div>
          )}

        
          {!loading && !error && filteredBookings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBookings.map((booking) => {
                const car = booking.car;
                const renter = booking.renter;
                const status =
                  STATUS_MAP[booking.status] || STATUS_MAP.pending;
                const StatusIcon = status.icon;

                return (
                  <div
                    key={booking._id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-36 bg-gray-100">
                        {car?.images?.length > 0 ? (
                          <img
                            src={car.images[0]}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car size={28} className="text-gray-400" />
                          </div>
                        )}

                        <div className="absolute top-2.5 right-2.5">
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-md border bg-white/95 text-[11px] font-semibold ${status.className}`}
                          >
                            <StatusIcon size={12} />
                            {status.label}
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        {/* CAR */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wide text-[#F36F20] font-semibold truncate">
                              {car?.category?.replace("_", " ")}
                            </p>
                            <h2 className="text-base font-bold text-gray-900 mt-0.5 truncate">
                              {car?.brand} {car?.model}
                            </h2>
                            <p className="text-xs text-gray-500">
                              {car?.year}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-[10px] text-gray-400">Ümumi</p>
                            <p className="text-base font-bold text-[#F36F20]">
                              {booking.totalPrice} ₼
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#F36F20] flex items-center justify-center shrink-0">
                              <User size={15} />
                            </div>

                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-900 truncate">
                                {renter?.name || "İstifadəçi"}
                              </p>
                              <p className="text-[11px] text-gray-500 truncate">
                                {renter?.email || "Email yoxdur"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                            <p className="text-[10px] text-gray-400">Başlanğıc</p>
                            <p className="text-xs font-semibold text-gray-900 mt-0.5">
                              {formatDate(booking.startDate)}
                            </p>
                          </div>

                          <div className="p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                            <p className="text-[10px] text-gray-400">Bitmə</p>
                            <p className="text-xs font-semibold text-gray-900 mt-0.5">
                              {formatDate(booking.endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}