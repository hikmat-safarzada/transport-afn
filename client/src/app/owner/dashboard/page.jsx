"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Car,
  CalendarDays,
  Star,
  ArrowRight,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Hero from "@/components/ui/Hero";

import {
  getMyCars,
  deleteCar,
} from "@/services/api.service";
import Footer from "@/components/layout/Footer";

export default function OwnerDashboard() {
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyCars = async () => {
    try {
      setLoading(true);

      const data = await getMyCars();

      setCars(data.cars || []);
    } catch (err) {
      console.error(err);
      setError("Avtomobilləri yükləyərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  const handleDelete = async (id) => {
    const answer = confirm(
      "Bu avtomobili silmək istədiyinizə əminsinizmi?"
    );

    if (!answer) return;

    try {
      setDeletingId(id);

      await deleteCar(id);

      setCars((prev) =>
        prev.filter((car) => car._id !== id)
      );
    } catch (err) {
      alert(err.message || "Avtomobil silinərkən xəta baş verdi.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Header />

      <Hero title="Mənim avtomobillərim" />

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Avtomobilləriniz
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Əlavə etdiyiniz avtomobilləri buradan idarə edə bilərsiniz.
              </p>
            </div>

            <Link
              href="/owner/add-car"
              className="inline-flex items-center justify-center gap-2
                         bg-[#F36F20] text-white
                         px-4 py-2.5 rounded-lg
                         text-sm font-semibold
                         hover:bg-[#d95f16]
                         transition"
            >
              <Plus size={17} />
              Avtomobil əlavə et
            </Link>
          </div>

          {/* CARS */}
          {loading && (
            <div className="flex justify-center py-20">
              <div
                className="w-8 h-8 border-[3px] border-slate-200
                           border-t-[#F36F20] rounded-full animate-spin"
              />
            </div>
          )}

          {!loading && error && (
            <div
              className="p-4 rounded-lg text-sm text-center
                         bg-red-50 border border-red-200 text-red-500"
            >
              {error}
            </div>
          )}

          {!loading && !error && cars.length === 0 && (
            <div
              className="text-center py-16 rounded-xl
                         bg-slate-50 border border-slate-200"
            >
              <Car
                size={32}
                className="mx-auto mb-3 text-slate-400"
              />

              <p className="text-sm text-slate-500 mb-4">
                Hələ heç bir avtomobil əlavə etməmisiniz.
              </p>

              <Link
                href="/owner/add-car"
                className="inline-flex items-center gap-2
                            text-sm font-semibold
                            text-[#F36F20]
                            hover:text-[#d95f16]"
              >
                <Plus size={16} />
                İlk avtomobilinizi əlavə edin
              </Link>
            </div>
          )}

          {!loading && !error && cars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="rounded-xl overflow-hidden
                             bg-white
                             border border-slate-200
                             shadow-sm
                             hover:shadow-md
                             transition"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    {car.images?.length > 0 ? (
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover
                                   transition duration-500
                                   hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Car
                          size={32}
                          className="text-slate-400"
                        />
                      </div>
                    )}

                    <div
                      className="absolute top-3 right-3
                                 px-2.5 py-1 rounded-md
                                 text-xs font-semibold
                                 text-white bg-black/60"
                    >
                      {car.year}
                    </div>
                  </div>

                  <div className="p-4">

                    <p className="text-xs uppercase tracking-wide
                                  text-[#F36F20] font-semibold mb-1">
                      {car.category?.replace("_", " ")}
                    </p>

                    <h2 className="text-lg font-bold text-slate-900">
                      {car.brand} {car.model}
                    </h2>

          
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-[#F5B84D]">
                        <Star size={15} fill="currentColor" />

                        <span className="text-sm font-semibold text-slate-800">
                          {car.rating || "0.0"}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400">
                        ({car.reviewCount || 0} rəy)
                      </span>
                    </div>

              
                    <div
                      className="flex items-center justify-between
                                 mt-4 pt-3
                                 border-t border-slate-100"
                    >
                      <span className="text-xs text-slate-500">
                        Günlük qiymət
                      </span>

                      <span className="text-lg font-bold text-slate-900">
                        {car.pricePerDay} ₼
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex border-t border-slate-200">

                    <Link
                      href={`/owner/edit-car/${car._id}`}
                      className="flex-1 flex items-center justify-center
                                 gap-2 py-3
                                 text-sm font-medium
                                 text-blue-500
                                 hover:bg-blue-50
                                 transition"
                    >
                      <Pencil size={15} />
                      Redaktə et
                    </Link>

                    <button
                      onClick={() => handleDelete(car._id)}
                      disabled={deletingId === car._id}
                      className="flex-1 flex items-center justify-center
                                 gap-2 py-3
                                 text-sm font-medium
                                 text-red-500
                                 border-l border-slate-200
                                 hover:bg-red-50
                                 disabled:opacity-50
                                 transition"
                    >
                      {deletingId === car._id ? (
                        <div
                          className="w-4 h-4 border-2
                                     border-red-400
                                     border-t-transparent
                                     rounded-full animate-spin"
                        />
                      ) : (
                        <>
                          <Trash2 size={15} />
                          Sil
                        </>
                      )}
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}

  
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

              <Link
                href="/owner/bookings"
                className="group flex items-center justify-between
                           p-5 rounded-xl
                           border border-slate-200
                           bg-white
                           hover:border-[#F36F20]/40
                           hover:shadow-sm
                           transition"
              >
                <div className="flex items-center gap-4">

                  <div
                    className="w-11 h-11 rounded-lg
                               flex items-center justify-center
                               bg-[#F36F20]/10
                               text-[#F36F20]"
                  >
                    <CalendarDays size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      İcarələr
                    </h3>

                    <p className="text-sm text-slate-500 mt-0.5">
                      Avtomobillərinizə gələn icarələrə baxın
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-400
                             group-hover:text-[#F36F20]
                             group-hover:translate-x-1
                             transition"
                />
              </Link>

              <Link
                href="/owner/reviews"
                className="group flex items-center justify-between
                           p-5 rounded-xl
                           border border-slate-200
                           bg-white
                           hover:border-[#F36F20]/40
                           hover:shadow-sm
                           transition"
              >
                <div className="flex items-center gap-4">

                  <div
                    className="w-11 h-11 rounded-lg
                               flex items-center justify-center
                               bg-[#F5B84D]/10
                               text-[#F5B84D]"
                  >
                    <Star size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Rəylər
                    </h3>

                    <p className="text-sm text-slate-500 mt-0.5">
                      Avtomobilləriniz haqqında rəylərə baxın
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-400
                             group-hover:text-[#F36F20]
                             group-hover:translate-x-1
                             transition"
                />
              </Link>

            </div>
          )}

        </div>
      </main>
      <Footer/>
    </>
  );
}