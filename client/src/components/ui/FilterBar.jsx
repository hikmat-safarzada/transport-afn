"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [model, setModel] = useState(searchParams.get("model") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");

  useEffect(() => {
    setBrand(searchParams.get("brand") || "");
    setCategory(searchParams.get("category") || "");
    setModel(searchParams.get("model") || "");
    setYear(searchParams.get("year") || "");
  }, [searchParams]);

  const handleFilter = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (brand.trim()) params.set("brand", brand.trim());
    if (category.trim()) params.set("category", category.trim());
    if (model.trim()) params.set("model", model.trim());
    if (year.trim()) params.set("year", year.trim());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setBrand("");
    setCategory("");
    setModel("");
    setYear("");
    router.push(pathname);
  };

  const hasActiveFilters = searchParams.toString().length > 0;

  return (
    <form 
      onSubmit={handleFilter} 
      className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-6xl mx-auto relative z-20 -mt-16 flex flex-col md:flex-row items-center gap-4 border border-gray-100/80"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1 w-full">
        
        <div className="bg-gray-50 hover:bg-gray-100/75 transition rounded-2xl px-4 py-3 flex flex-col justify-center">
          <label className="text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Brend</label>
          <input 
            name="brand" 
            type="text" 
            placeholder="Məs: Toyota"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-transparent text-gray-800 font-semibold text-sm focus:outline-none placeholder:text-gray-400 w-full"
          />
        </div>

        <div className="bg-gray-50 hover:bg-gray-100/75 transition rounded-2xl px-4 py-3 flex flex-col justify-center">
          <label className="text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Sinif</label>
          <input 
            name="category" 
            type="text" 
            placeholder="Məs: Econom"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent text-gray-800 font-semibold text-sm focus:outline-none placeholder:text-gray-400 w-full"
          />
        </div>

        <div className="bg-gray-50 hover:bg-gray-100/75 transition rounded-2xl px-4 py-3 flex flex-col justify-center">
          <label className="text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Model</label>
          <input 
            name="model" 
            type="text" 
            placeholder="Məs: Camry"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-transparent text-gray-800 font-semibold text-sm focus:outline-none placeholder:text-gray-400 w-full"
          />
        </div>

        <div className="bg-gray-50 hover:bg-gray-100/75 transition rounded-2xl px-4 py-3 flex flex-col justify-center">
          <label className="text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">İl</label>
          <input 
            name="year" 
            type="number" 
            min="2015"
            max="2100"
            placeholder="Məs: 2023"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-transparent text-gray-800 font-semibold text-sm focus:outline-none placeholder:text-gray-400 w-full"
          />
        </div>

      </div>

      <div className="flex items-center gap-2 w-full md:w-auto shrink-0 self-stretch">
        {hasActiveFilters && (
          <button 
            type="button"
            onClick={handleReset}
            title="Filterləri təmizlə"
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 rounded-2xl font-semibold transition text-sm flex justify-center items-center h-full min-h-[52px] md:min-h-0 cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
        <button 
          type="submit"
          className="flex-1 md:flex-initial bg-[#F36F20] hover:bg-[#d85e17] text-white px-8 rounded-2xl font-semibold transition shadow-lg shadow-[#F36F20]/25 text-sm flex justify-center items-center gap-2 h-[52px] cursor-pointer"
        >
          <Search size={16} />
          Axtar
        </button>
      </div>

    </form>
  );
}