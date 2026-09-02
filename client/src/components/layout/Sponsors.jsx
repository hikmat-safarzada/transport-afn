
import Image from "next/image";

function Sponsors() {
  const sponsors = [
    { id: 1, name: "Kapital", logo: "/sponsors/kapital.png" },
    { id: 2, name: "CCI", logo: "/sponsors/cci.png" },
    { id: 3, name: "Socar", logo: "/sponsors/socar.png" },
    { id: 4, name: "Halliburton", logo: "/sponsors/halliburton.png" },
    { id: 5, name: "Silkway", logo: "/sponsors/silkway.png" },
    { id: 6, name: "GE Travel", logo: "/sponsors/travel.png" },
  ];

  return (
    <section className="py-12 bg-gray-50/50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold uppercase tracking-wider text-gray-900">
            Partnyorlar
          </h2>
          <div className="w-16 h-1 bg-[#F36F20] mx-auto mt-2.5 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 items-center justify-items-center">
          {sponsors.map((brand) => (
            <div
              key={brand.id}
              className="w-full h-20 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center relative"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Sponsors;