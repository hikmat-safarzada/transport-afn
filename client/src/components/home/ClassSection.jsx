"use client";

import { useRouter } from "next/navigation";
import CarCard from "../ui/CarCard";

const categories = [
  { id: "all", label: "Hamısı" },
  { id: "ekonom", label: "Ekonom" },
  { id: "biznes", label: "Biznes" },
  { id: "premium", label: "Premium" },
  { id: "crossover", label: "Crossover & SUV" },
  { id: "bus", label: "Avtobuslar və Mikroavtobuslar" },
];

const carsData = [
  {
    id: "1",
    brand: "Toyota",
    model: "Tacoma",
    year: 2021,
    pricePerDay: 75,
    category: "econom",
    images: ["/thumbs/toyota-tacoma.jpeg"],
    engineCapacity: "1.5 L",
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "2",
    brand: "Hyundai",
    model: "Tucson",
    year: 2021,
    pricePerDay: 60,
    category: "econom",
    images: ["/thumbs/htucson.jpeg"],
    engineCapacity: "2.0 L",
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "3",
    brand: "Mercedes",
    model: "SL-Class",
    year: 2021,
    pricePerDay: 75,
    category: "premium",
    images: ["/thumbs/mercedess.jpeg"],
    engineCapacity: "3.0 L",
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "4",
    brand: "Ford",
    model: "Fusion",
    year: 2021,
    pricePerDay: 75,
    category: "econom",
    images: ["/thumbs/fordf.jpeg"],
    engineCapacity: "1.5 L",
    transmission: "Avtomat",
    fuelType: "Hibrid",
  },
];

export default function ClassSection() {
  const router = useRouter();
  const handleNavigate = (e) => {
    if (e) e.preventDefault();
    router.push("/renter/dashboard");
  };

  return (
    <section className="pt-0 -mt-6 sm:-mt-10 pb-16 bg-transparent relative z-10">
      <div className="container mx-auto px-4 max-w-6xl bg-white pt-6 rounded-t-xl">
        <div className="text-center flex flex-col justify-center items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            İcarəyə verilən avtomobillər (klass üzrə)
          </h2>
          <div className="w-10 h-1 bg-[#F36F20] mt-5"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={handleNavigate}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition duration-200 ${
                index === 0
                  ? "border-orange-500 text-orange-500 bg-orange-50"
                  : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carsData.map((car) => (
            <div key={car.id} onClick={handleNavigate} className="cursor-pointer">
              <CarCard car={car} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={handleNavigate}
            className="inline-block border border-orange-500 text-orange-500 px-6 py-2 rounded-md text-medium font-semibold hover:bg-orange-500 hover:text-white transition duration-200 cursor-pointer"
          >
            Hamısını göstər
          </button>
        </div>
      </div>
    </section>
  );
}