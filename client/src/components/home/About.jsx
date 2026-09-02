// components/home/About.jsx
import Image from "next/image";
import More from "../button/More";
import Link from "next/link";

function About() {
  return (
   <section className="pt-8 pb-24 sm:pb-32 bg-[#A6A6A6]/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/thumbs/cars.jpg"
                alt="Avtomobil kirayəsi Bakıda"
                fill
                className="object-cover grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center text-gray-700">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Avtomobil kirayəsi Bakıda
            </h2>

            <div className="w-9 h-1 bg-[#F36F20] mb-4"></div>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed">
              <p>
                İstər xidmət səviyyəmiz, istərsə də yüksək keyfiyyətimizlə bir çox icarə maşın şirkətlərdən seçilir.
              </p>
              <p>
                Şirkət bu növ icarə maşınlar ilə məşğuldur: minik maşınlar, mikroavtobus və avtobusların (günlük, aylıq və uzunmüddətli).
              </p>
              <p>
                Geniş avtoparkımız sizə Bakı və Azərbaycanda istənilən vaxt istənilən növ icarə maşın götürməyə imkan verir.
              </p>
              <p>
                Şirkətin balansında son model sedan, suv, crossover, minivan, 4 – 55 nəfər tutumlu komfortlu, geniş və təmiz icarə maşınlar yer almaqdadır.
              </p>
            </div>

            <div className="pt-4">
              <Link href={"/about"}>
                  <More/>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;