"use client";
import { XCircle, CheckCircle, Clock } from "lucide-react";

export default function BookingCard({
  booking,
  cancellingId,
  onCancel,
}) {
  const car = booking.car;

  const isCancelled =
    booking.status === "cancelled";

  const isCompleted =
    !isCancelled &&
    new Date(booking.endDate) < new Date();

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition">


      <div className="relative h-40 bg-gray-100 overflow-hidden">

        {car?.images?.length > 0 ? (
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
            Şəkil yoxdur
          </div>
        )}


        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute top-3 right-3">
          {isCancelled ? (
            <span className="inline-flex items-center gap-1 bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-sm">
              <XCircle size={14} />
              Ləğv edildi
            </span>
          ) : isCompleted ? (
            <span className="inline-flex items-center gap-1 bg-gray-800 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-sm">
              <CheckCircle size={14} />
              Tamamlandı
            </span>
          ) : booking.status === "confirmed" ? (
            <span className="inline-flex items-center gap-1 bg-green-500 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-sm">
              <CheckCircle size={14} />
              Təsdiqləndi
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-yellow-500 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-sm">
              <Clock size={14} />
              Gözləyir
            </span>
          )}
        </div>

      </div>



      <div className="p-4">


        <div className="flex justify-between items-start gap-3 mb-4">

          <div className="min-w-0">

            <h3 className="font-bold text-gray-900 truncate">
              {car?.brand} {car?.model}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {car?.year} • {car?.category}
            </p>

          </div>

          <div className="text-right shrink-0">

            <p className="text-[10px] text-gray-400">
              Ümumi
            </p>

            <p className="text-base font-bold text-[#F36F20]">
              {booking.totalPrice} ₼
            </p>

          </div>

        </div>


        {/* DATES */}

        <div className="grid grid-cols-2 gap-2 mb-4">

          <div className="bg-gray-50 rounded-xl p-2.5">

            <p className="text-[10px] text-gray-400">
              Başlanğıc
            </p>

            <p className="text-xs font-semibold text-gray-800 mt-1">
              {new Date(
                booking.startDate
              ).toLocaleDateString("az-AZ")}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-2.5">

            <p className="text-[10px] text-gray-400">
              Bitmə
            </p>

            <p className="text-xs font-semibold text-gray-800 mt-1">
              {new Date(
                booking.endDate
              ).toLocaleDateString("az-AZ")}
            </p>

          </div>

        </div>



        <div className="border-t border-gray-100 pt-3 space-y-2">

          {booking.city && (
            <div className="flex justify-between text-xs">

              <span className="text-gray-400">
                Şəhər
              </span>

              <span className="font-medium text-gray-700">
                {booking.city}
              </span>

            </div>
          )}

          <div className="flex justify-between text-xs">

            <span className="text-gray-400">
              Ödəniş
            </span>

            <span className="font-medium text-gray-700">
              {booking.paymentType}
            </span>

          </div>

        </div>


        {/* CANCEL */}

        {!isCancelled && !isCompleted && (
          <button
            onClick={() => onCancel(booking._id)}
            disabled={cancellingId === booking._id}
            className="w-full mt-4 border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-xl text-xs font-semibold transition disabled:opacity-50"
          >
            {cancellingId === booking._id
              ? "Ləğv edilir..."
              : "İcarəni ləğv et"}
          </button>
        )}

      </div>

    </div>
  );
}