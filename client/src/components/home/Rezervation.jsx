"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Rezervation() {
  const router = useRouter();

  return (
    <section className="py-16 bg-[#282828] text-[#F0F0F0] overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
                Bir neçə dəqiqəyə <br />
                <span>arenda maşın Bakıda</span>
              </h2>
              <p className=" mt-3 text-sm sm:text-base leading-relaxed">
                Bakıda avtomobil kirayəsinin ən yaxşı şərtlərlə sürətli sifarişi üçün bizimlə əlaqə saxlayın.
              </p>
            </div>

            <Link href={"/terms"}>
                <button
                type="submit"
                className="mt-4 px-8 py-3.5 bg-[#F36F20] hover:bg-[#d85e16] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              >
                Şərtlərlə tanış olun
              </button>
            </Link>
          </div>

          <div className="relative w-full h-64 sm:h-80 lg:h-96">
            <Image
              src="/images/car-404.png"
              alt="Arenda Maşın Bakıda"
              fill
              priority
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Rezervation;