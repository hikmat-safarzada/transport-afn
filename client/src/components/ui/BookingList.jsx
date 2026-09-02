"use client";
import {Car} from "lucide-react"
import BookingCard from "./BookingCard";

export default function BookingList({
  bookings,
  loading,
  error,
  activeTab,
  cancellingId,
  onCancel,
}) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-9 h-9 border-4 border-gray-200 border-t-[#F36F20] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-5 text-sm">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl py-14 px-6 text-center">

        <div className="flex justify-center mb-4 text-gray-400">
          <Car size={40} strokeWidth={1.5} />
        </div>

        <h3 className="text-base font-semibold text-gray-800">
          {activeTab === "active"
            ? "Aktiv icarəniz yoxdur"
            : activeTab === "completed"
            ? "Tamamlanmış icarəniz yoxdur"
            : "Ləğv edilmiş icarəniz yoxdur"}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          İcarələriniz burada görünəcək.
        </p>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          cancellingId={cancellingId}
          onCancel={onCancel}
        />
      ))}

    </div>
  );
}