"use client";

import Image from "next/image";

function Delivery() {
  return (
    <section className="relative w-full bg-[#f4f4f4]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[420px] lg:min-h-[480px]">
        
        <div className="lg:col-span-5 relative w-full h-full min-h-[300px]">
          <Image
            src="/images/gallery.jpg"
            alt="AFN Transport Çatdırılma"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 py-10 lg:py-12 bg-[url(/images/delivery.jpg)] bg-cover bg-center bg-no-repeat overflow-hidden">
          <div className="max-w-3xl w-full flex flex-col justify-center items-start text-left">
            
            <div className="flex flex-col items-start gap-3 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">
                Çatdırılma
              </h2>
              <span className="w-16 h-1 bg-[#F36F20] rounded-full inline-block"></span>
            </div>

            <div className="space-y-4 sm:space-y-5 text-gray-700 text-3 lg:text-[20px] leading-relaxed text-left w-full">
              <p>
                AFN Transport olaraq her Class”a uygun arenda avtomobil modellərimizi istənilən ünvana çatdırılma mövcuddur.
              </p>

              <p>
                AFN Transport tam 10 ildir ki müştərilərinə arenda masinlar ilə təmin edir.
              </p>

              <p>
                Keyfiyyetli avotomobil, avtobus ve mikroavtobuslarin icaresi ucun AFN Transport.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Delivery;