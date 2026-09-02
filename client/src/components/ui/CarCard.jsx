import Image from "next/image";
import { Fuel, Settings2, Gauge } from "lucide-react";
import Link from "next/link";
import More from "../button/More";

const categoryLabels = {
  ekonom: "Ekonom",
  economy: "Ekonom",
  biznes: "Biznes",
  premium: "Premium",
  crossover: "Crossover & SUV",
  bus: "Avtobuslar və Mikroavtobuslar",
};

export default function CarCard({ car }) {
  const defaultImage = "/images/default-car.jpg";
  const carImage = car.images?.length > 0 ? car.images[0] : defaultImage;

  const getCategoryBadgeClass = (category) => {
    const cat = category?.toLowerCase();

    if (cat === "ekonom" || cat === "econom") {
      return "bg-emerald-500 text-white font-medium border border-emerald-600 shadow-sm";
    }
    if (cat === "premium") {
      return "bg-amber-500 text-white font-medium border border-amber-600 shadow-sm";
    }
    return "bg-gray-700 text-white font-medium border border-gray-800 shadow-sm";
  };

  const displayCategoryLabel = 
    categoryLabels[car.category?.toLowerCase()] || 
    car.category?.replace("_", " ");

  const specs = [
    { icon: Fuel, value: car.fuelType },
    { icon: Settings2, value: car.transmission },
    { icon: Gauge, value: car.engineCapacity },
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col">
      <div className="relative h-40 w-full bg-gray-50 overflow-hidden shrink-0">
        <Image
          src={carImage}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div
          className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full border shadow-sm ${getCategoryBadgeClass(
            car.category
          )}`}
        >
          <span className="text-[11px] font-semibold">
            {displayCategoryLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold text-gray-900 truncate">
          {car.brand} {car.model}
        </h3>

        <p className="text-xs text-gray-400 font-medium mt-0.5">
          {car.year} - ci il
        </p>

        <div className="flex text-6 items-baseline gap-1 mt-1">
          <span className=" font-semibold text-orange-500">
            {car.pricePerDay} AZN/gün
          </span>
        </div>

        <div className="w-full h-[1px] bg-gray-100 my-3" />

        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {specs.map(({ icon: Icon, value }, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 px-1"
            >
              <Icon size={16} className="text-gray-400 shrink-0" />
              <span className="text-xs font-medium text-gray-600 truncate max-w-full text-center">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-1">
          <Link href={`/cars/${car._id || car.id}`}>
            <More size="lg" fullWidth />
          </Link>
        </div>
      </div>
    </div>
  );
}