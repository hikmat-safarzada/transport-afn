"use client";

import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "@/services/api.service";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/ui/Hero";
import BookingList from "@/components/ui/BookingList";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingError, setBookingError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [activeTab, setActiveTab] = useState("active");


  const fetchMyBookings = async () => {
    try {
      setLoadingBookings(true);
      setBookingError("");

      const data = await getMyBookings();

      setBookings(data.bookings || []);
    } catch (error) {
      setBookingError(
        error.message || "İcarələri yükləmək mümkün olmadı"
      );
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const activeBookings = bookings.filter(
    (booking) =>
      (booking.status === "pending" ||
        booking.status === "confirmed") &&
      new Date(booking.endDate) >= new Date()
  );

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status !== "cancelled" &&
      new Date(booking.endDate) < new Date()
  );

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  );

  const displayedBookings =
    activeTab === "active"
      ? activeBookings
      : activeTab === "completed"
        ? completedBookings
        : cancelledBookings;

  const handleCancel = async (id) => {
    const answer = confirm(
      "Bu icarəni ləğv etmək istəyirsiniz?"
    );

    if (!answer) return;

    try {
      setCancellingId(id);

      await cancelBooking(id);

      await fetchMyBookings();
    } catch (error) {

      alert(
        error.message || "İcarəni ləğv etmək mümkün olmadı"
      );
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <>
      <Header />

      <Hero title="Mənim icarələrim" />

      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

          <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 text-center sm:text-left">

            <div>
              <p className="text-base font-medium text-gray-800">
                İcarələrinizi buradan izləyin və idarə edin.
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Aktiv və əvvəlki rezervasiyalarınızı nəzərdən keçirin.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl px-6 py-3 shadow-sm min-w-[150px] mx-auto sm:mx-0">
              <p className="text-xs text-gray-400">
                Ümumi icarələr
              </p>

              <p className="text-xl font-bold text-gray-900 mt-0.5">
                {bookings.length}
              </p>
            </div>

          </section>

          <section className="mb-8 flex justify-center">

            <div className="inline-flex flex-wrap justify-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm gap-1">

              <button
                onClick={() => setActiveTab("active")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "active"
                    ? "bg-[#F36F20] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
              
                Aktiv
                <span className="ml-1 text-xs">
                  ({activeBookings.length})
                </span>
              </button>

              <button
                onClick={() => setActiveTab("completed")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "completed"
                    ? "bg-[#F36F20] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
      
                Tamamlanmış
                <span className="ml-1 text-xs">
                  ({completedBookings.length})
                </span>
              </button>

              <button
                onClick={() => setActiveTab("cancelled")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "cancelled"
                    ? "bg-[#F36F20] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Ləğv edilmiş
                <span className="ml-1 text-xs">
                  ({cancelledBookings.length})
                </span>
              </button>

            </div>

          </section>


          <section>
            <BookingList
              bookings={displayedBookings}
              loading={loadingBookings}
              error={bookingError}
              activeTab={activeTab}
              cancellingId={cancellingId}
              onCancel={handleCancel}
            />
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}