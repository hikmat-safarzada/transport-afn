"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, User, Car } from "lucide-react";
import Header from "@/components/layout/Header";
import Hero from "@/components/ui/Hero";
import { getOwnerReviews } from "@/services/api.service";
import Footer from "@/components/layout/Footer";
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("az-AZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function OwnerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getOwnerReviews();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Rəyləri yükləmək mümkün olmadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Header/>
      <Hero title="Rəylər" />
      <main className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Müştəri rəyləri
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Avtomobilləriniz haqqında yazılmış rəylər.
              </p>
            </div>

            <Link
              href="/owner/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#F36F20] transition"
            >
              <ArrowLeft size={16} />
              Avtomobillərim
            </Link>
          </div>

          
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-[3px] border-slate-200 border-t-[#F36F20] rounded-full animate-spin" />
            </div>
          )}

          
          {!loading && error && (
            <div className="p-4 rounded-lg text-sm text-center bg-red-50 border border-red-200 text-red-500">
              {error}
            </div>
          )}

          
          {!loading && !error && reviews.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 py-16 text-center">
              <Star size={32} className="mx-auto mb-3 text-slate-400" />
              <p className="text-sm text-slate-500">
                Hələ heç bir rəy yoxdur.
              </p>
            </div>
          )}

          
          {!loading && !error && reviews.length > 0 && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                >
              
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F36F20]/10 text-[#F36F20]">
                        <User size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {review.renter?.name || "İstifadəçi"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>

            
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={17}
                          fill={index < review.rating ? "currentColor" : "none"}
                          className="text-[#F5B84D]"
                        />
                      ))}
                    </div>
                  </div>

              
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 text-slate-500">
                      <Car size={17} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-400">Avtomobil</p>
                      <p className="text-sm font-semibold text-slate-800">
                        {review.car?.brand || "—"} {review.car?.model || ""}
                      </p>
                      {review.car?.year && (
                        <p className="text-xs text-slate-400">
                          {review.car.year}
                        </p>
                      )}
                    </div>
                  </div>

        
                  <div className="mt-4">
                    <p className="text-sm leading-6 text-slate-600">
                      “{review.comment}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer/>
    </>
  );
}