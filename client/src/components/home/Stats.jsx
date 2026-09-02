// components/home/Stats.jsx

function Stats() {
  const statsData = [
    {
      id: 1,
      value: "20+ il",
      label: "Təcrübə",
    },
    {
      id: 2,
      value: "80+",
      label: "İcarə maşın",
    },
    {
      id: 3,
      value: "98%",
      label: "Məmnuniyyət faizi",
    },
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 mb-8 sm:mb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {statsData.map((item) => (
            <div
              key={item.id}
              className="bg-[url(/thumbs/stat.jpg)] bg-cover bg-center bg-no-repeat overflow-hidden text-white rounded-lg py-5 px-6 text-center shadow-lg hover:bg-[#222222] transition duration-300 flex flex-col justify-center items-center h-28 sm:h-32"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {item.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-medium uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;