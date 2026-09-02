"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CarCard from "@/components/ui/CarCard";

import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
  Calendar,
  Car,
  Settings2,
  Tag,
  Gauge,
  Fuel,
} from "lucide-react";

import CarReviews from "@/components/layout/CarReviews";

export default function CarDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [car, setCar] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");
  const [selectedDays, setSelectedDays] = useState(10);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        }
      } catch (err) {
        throw new Error(err)
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchCarData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/cars/${id}`);

        if (!res.ok) {
          throw new Error(`Maşın tapılmadı. Status: ${res.status}`);
        }

        const data = await res.json();
        setCar(data);

        const relatedRes = await fetch(`/api/cars?limit=5`);

        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          const cars = Array.isArray(relatedData)
            ? relatedData
            : relatedData.cars || [];

          const filteredCars = cars
            .filter((item) => String(item._id) !== String(id))
            .slice(0, 4);

          setRelatedCars(filteredCars);
        } else {
          setRelatedCars([]);
        }
      } catch (err) {
        setError(err.message || "Məlumat yüklənərkən xəta baş verdi.");
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <Loader2 className="animate-spin text-[#F36F20]" size={40} />
        </div>
      </>
    );
  }

  if (error || !car) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 gap-4 px-4">
          <p className="text-red-500 font-semibold text-center">
            {error || "Avtomobil tapılmadı."}
          </p>
          <Link
            href="/cars"
            className="bg-[#F36F20] text-white px-5 py-2 rounded-lg"
          >
            Avtomobillərə qayıt
          </Link>
        </div>
      </>
    );
  }

  const basePrice = Number(car.pricePerDay || 0);

  const getDiscountRate = (days) => {
    if (days >= 15) return 0.3;
    if (days >= 10) return 0.2;
    if (days >= 5) return 0.1;
    return 0;
  };

  const discount = getDiscountRate(selectedDays);
  const discountedPricePerDay = Math.round(basePrice * (1 - discount));
  const totalPrice = selectedDays * discountedPricePerDay;

  const images = car.images?.length > 0 ? car.images : ["/images/default-car.jpg"];

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen py-8 text-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-gray-800 transition">
              Əsas səhifə
            </Link>
            <span>&gt;</span>
            <Link
              href={`/renter/dashboard?category=${car.category}`}
              className="hover:text-gray-800 transition"
            >
              {car.category}
            </Link>
            <span>&gt;</span>
            <span className="text-[#F36F20] font-medium">
              {car.brand} {car.model}
            </span>
          </nav>

  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="relative h-72 sm:h-96 w-full rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm">
                <Image
                  src={images[selectedImgIndex]}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImgIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImgIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {images.map((img, index) => (
                    <div
                      key={`${img}-${index}`}
                      onClick={() => setSelectedImgIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${selectedImgIndex === index
                          ? "border-[#F36F20]"
                          : "border-transparent hover:opacity-80"
                        }`}
                    >
                      <Image
                        src={img}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-8 flex flex-col justify-center border border-gray-100 bg-cover bg-center bg-no-repeat" style={{
              backgroundImage: "url('/images/price-bg.jpg')",
            }}>
              <div className="mb-3">
                <span className="inline-block bg-[#f48446] text-white text-xs px-3 py-1.5 rounded-md font-medium tracking-wide">
                  {car.category} Klass
                </span>
              </div>

              <h1 className="text-[32px] font-bold text-gray-800 mb-3">
                {car.brand} {car.model}
              </h1>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[32px] font-bold text-[#F36F20]">
                  {basePrice} AZN
                </span>
                <span className="text-sm text-gray-400">/gün</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm gap-4">
                  <span className="font-bold text-gray-700 w-[120px]">5-10 gün icarə:</span>
                  <span className="text-gray-500">
                    {Math.round(basePrice * 0.9)} AZN/gün (10% endirim)
                  </span>
                </div>

                <div className="flex items-center text-sm gap-4">
                  <span className="font-bold text-gray-700 w-[120px]">10-15 gün icarə:</span>
                  <span className="text-gray-500">
                    {Math.round(basePrice * 0.8)} AZN/gün (20% endirim)
                  </span>
                </div>

                <div className="flex items-center text-sm gap-4">
                  <span className="font-bold text-gray-700 w-[120px]">15-30 gün icarə:</span>
                  <span className="text-gray-500">
                    {Math.round(basePrice * 0.7)} AZN/gün (30% endirim)
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  {/* Select Butonu */}
                  <div className="relative w-32">
                    <select
                      value={selectedDays}
                      onChange={(e) => setSelectedDays(Number(e.target.value))}
                      className="w-full appearance-none bg-transparent border border-[#F36F20] text-[#F36F20] px-4 py-2.5 rounded-lg text-sm font-semibold outline-none cursor-pointer"
                    >
                      <option value={5}>5 gün</option>
                      <option value={10}>10 gün</option>
                      <option value={15}>15 gün</option>
                      <option value={20}>20 gün</option>
                      <option value={30}>30 gün</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F36F20] pointer-events-none"
                    />
                  </div>

                  <Link
                    href={`/cars/${car._id}/booking?days=${selectedDays}`}
                    className="w-40 bg-[#F36F20] hover:bg-[#e05e10] text-white font-medium py-2.5 px-4 rounded-lg text-sm text-center transition"
                  >
                    İndi icarə et
                  </Link>
                </div>

                <p className="text-[11px] text-gray-400 font-medium pl-1 tracking-wider uppercase">
                  {selectedDays}X{discountedPricePerDay}AZN={totalPrice}AZN
                </p>
              </div>
            </div>
          </div>

          <div className="mb-14">
            <div className="flex gap-8 cursor-pointer border-b border-gray-200 mb-6 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`pb-3 text-lg font-bold whitespace-nowrap ${activeTab === "specs"
                    ? "text-gray-900 border-b-2 border-[#F36F20]"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                Xüsusiyyətlər
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("terms")}
                className={`pb-3 text-lg font-bold whitespace-nowrap ${activeTab === "terms"
                    ? "text-gray-900 border-b-2 border-[#F36F20]"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                İcarə üçün şərtlər
              </button>
            </div>

            {activeTab === "specs" && (
              <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                  <div className="flex items-center gap-3.5">
                    <Calendar size={32} className="text-[#F36F20]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-bold text-gray-700">İl:</p>
                      <p className="text-sm text-gray-500">{car.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Car size={32} className="text-[#F36F20]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-bold text-gray-700">Klass:</p>
                      <p className="text-sm text-gray-500">{car.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Settings2 size={32} className="text-[#F36F20]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-bold text-gray-700">Transmissiya:</p>
                      <p className="text-sm text-gray-500">{car.transmission}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Tag size={32} className="text-[#F36F20]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-bold text-gray-700">Qiymət:</p>
                      <p className="text-sm text-gray-500">{car.pricePerDay} AZN</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Gauge size={32} className="text-[#F36F20]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-bold text-gray-700">Mühərrik:</p>
                      <p className="text-sm text-gray-500">{car.engineCapacity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Fuel size={32} className="text-[#F36F20]" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-bold text-gray-700">Yanacaq:</p>
                      <p className="text-sm text-gray-500">{car.fuelType}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "terms" && (
              <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm text-gray-600 font-medium">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F36F20]" />
                      <span>Depozit: {car.deposit || 200} AZN</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F36F20]" />
                      <span>Sürücülük vəsiqəsi</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F36F20]" />
                      <span>İcarə üçün öncədən ödəniş</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F36F20]" />
                      <span>Sürücülük təcrübəsi: {car.minExperience || 2} il</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F36F20]" />
                      <span>Minimal yaş: {car.minAge || 24}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F36F20]" />
                      <span>Şəxsiyyət vəsiqəsi</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <section className="mt-14">
            <div className="flex justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Digər avtomobillər
              </h2>
              <Link
                href="/renter/dashboard"
                className="border border-[#F36F20] text-[#F36F20] hover:bg-[#F36F20] hover:text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
              >
                Daha çox
              </Link>
            </div>

            {relatedCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {relatedCars.map((item) => (
                  <CarCard key={item._id} car={item} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Digər avtomobillər tapılmadı.
              </p>
            )}
          </section>

          <section className="mt-16 mb-16">
            <CarReviews carId={id} currentUser={user} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}