"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { updateCar } from "@/services/api.service";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const carId = params.id;

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    category: "econom",
    year: "",
    pricePerDay: "",
    transmission: "Avtomat",
    fuelType: "Benzin",
    engineCapacity: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`/api/cars/${carId}`, {
          credentials: "include",
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || "Məlumatı tapmaq olmadı");

        setFormData({
          brand: data.brand || "",
          model: data.model || "",
          category: data.category || "econom",
          year: data.year || "",
          pricePerDay: data.pricePerDay || "",
          transmission: data.transmission || "Avtomat",
          fuelType: data.fuelType || "Benzin",
          engineCapacity: data.engineCapacity || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (carId) fetchCarDetails();
  }, [carId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    try {
      await updateCar(carId, formData);
      setIsNavigating(true);
      router.push("/owner/dashboard");
    } catch (err) {
      setError(err.message || "Yenilənərkən xəta baş verdi");
      setUpdating(false);
      setIsNavigating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c1d21] flex justify-center items-center text-white">
        <svg className="animate-spin h-10 w-10 text-[#F36F20]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <svg className="animate-spin h-12 w-12 text-[#F36F20] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-sm font-medium tracking-wide animate-pulse">
            Dəyişikliklər yadda saxlanılır...
          </p>
        </div>
      )}

      <div 
        className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/gallery.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 max-w-xl w-full bg-[#1c1d21]/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">Avtomobili Redaktə Et</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Brend</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Kateqoriya</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                >
                  <option value="econom">Ekonom</option>
                  <option value="business">Biznes</option>
                  <option value="crossover_suv">Krossover / SUV</option>
                  <option value="premium">Premium</option>
                  <option value="buses_minivans">Avtobus / Minivan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Buraxılış ili</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Transmissiya</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                >
                  <option value="Avtomat">Avtomat</option>
                  <option value="Mexanika">Mexanika</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Yanacaq Növü</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                >
                  <option value="Benzin">Benzin</option>
                  <option value="Dizel">Dizel</option>
                  <option value="Hibrid">Hibrid</option>
                  <option value="Elektrik">Elektrik</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Mühərrik Həcmi</label>
                <input
                  type="text"
                  name="engineCapacity"
                  value={formData.engineCapacity}
                  onChange={handleChange}
                  placeholder="Məs: 2.0 l"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Günlük İcarə Qiyməti (₼)</label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-[#F36F20] hover:bg-[#d85e17] text-white py-3 rounded-lg text-xs font-semibold transition disabled:opacity-50 shadow-md shadow-[#F36F20]/30 flex justify-center items-center gap-2"
              >
                {updating ? "Yenilənir..." : "Yadda Saxla"}
              </button>

              <Link
                href="/owner/dashboard"
                className="flex-1 bg-gray-800/80 hover:bg-gray-700 text-gray-300 py-3 rounded-lg text-xs font-semibold transition text-center border border-gray-700 flex items-center justify-center"
              >
                Ləğv et
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}