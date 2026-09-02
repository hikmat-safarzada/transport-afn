"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCar } from "@/services/api.service";

export default function AddCarPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    category: "econom",
    year: "",
    pricePerDay: "",
    transmission: "Avtomat",
    fuelType: "Benzin",
    engineCapacity: "",
    images: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("brand", formData.brand);
      dataToSend.append("model", formData.model);
      dataToSend.append("category", formData.category);
      dataToSend.append("year", formData.year);
      dataToSend.append("pricePerDay", formData.pricePerDay);
      dataToSend.append("transmission", formData.transmission);
      dataToSend.append("fuelType", formData.fuelType);
      dataToSend.append("engineCapacity", formData.engineCapacity);


      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          dataToSend.append("images", file);
        });
      }

      await createCar(dataToSend);

      setIsNavigating(true);
      router.push("/owner/dashboard");
    } catch (err) {
      setError(err.message || "Maşın əlavə edilərkən xəta baş verdi.");
      setLoading(false);
      setIsNavigating(false);
    }
  };

  return (
    <>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <svg className="animate-spin h-12 w-12 text-[#F36F20] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-sm font-medium tracking-wide animate-pulse">
            Maşın sistemə əlavə edilir...
          </p>
        </div>
      )}

      <div
        className="min-h-screen p-4 md:p-8 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/images/gallery.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 max-w-xl w-full bg-[#1c1d21]/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700/50">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700/60 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Yeni Avtomobil Əlavə Et</h2>
              <p className="text-xs text-gray-400 mt-1">Avtomobilin əsas və texniki məlumatlarını daxil edin</p>
            </div>
            <Link
              href="/owner/dashboard"
              className="text-xs text-gray-400 hover:text-[#F36F20] transition bg-[#151619] px-3 py-2 rounded-lg border border-gray-700"
            >
              ← Geri qayıt
            </Link>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Marka</label>
                <input
                  type="text"
                  name="brand"
                  required
                  placeholder="Məs: Mercedes-Benz"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  required
                  placeholder="Məs: CLS 63 AMG"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Kateqoriya (Sinif)</label>
                <select
                  name="category"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="econom">Ekonom</option>
                  <option value="business">Biznes</option>
                  <option value="crossover_suv">Krossover / SUV</option>
                  <option value="premium">Premium</option>
                  <option value="buses_minivans">Avtobus / Minivan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Buraxılış İli</label>
                <input
                  type="number"
                  name="year"
                  required
                  placeholder="Məs: 2021"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Transmissiya</label>
                <select
                  name="transmission"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.transmission}
                  onChange={handleChange}
                >
                  <option value="Avtomat">Avtomat</option>
                  <option value="Mexanika">Mexanika</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Yanacaq Növü</label>
                <select
                  name="fuelType"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.fuelType}
                  onChange={handleChange}
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
                  placeholder="Məs: 2.0 l"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.engineCapacity}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Günlük Qiymət (AZN)</label>
                <input
                  type="number"
                  name="pricePerDay"
                  required
                  placeholder="Məs: 150"
                  className="w-full bg-[#151619]/90 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#F36F20] transition"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Avtomobilin Şəkilləri</label>
              <input
                type="file"
                multiple
                name="images" 
                accept="image/*"
                required
                className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#F36F20] file:text-white hover:file:bg-[#d85e17] file:cursor-pointer bg-[#151619]/90 border border-gray-700 rounded-lg p-1.5"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F36F20] hover:bg-[#d85e17] text-white p-3 rounded-lg text-xs font-semibold transition duration-200 disabled:opacity-50 shadow-md shadow-[#F36F20]/30 flex justify-center items-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Əlavə edilir...
                </>
              ) : (
                "Avtomobili Əlavə Et"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}