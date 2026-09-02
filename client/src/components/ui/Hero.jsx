"use client";

import Image from "next/image";

export default function Hero({title}) {
  return (
    <section className="relative w-full h-72 sm:h-80 bg-black/95 flex items-center justify-center overflow-hidden">

      <Image
        src="/images/heroterm.jpg"
        alt="Rental Cars"
        fill
        priority
        className="object-cover object-center opacity-30"
      />

      <div className="relative z-10 text-center px-4">

        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {title}
        </h1>

        <div className="w-12 h-1 bg-[#F36F20] rounded-full mt-3 mx-auto" />

      </div>

    </section>
  );
}