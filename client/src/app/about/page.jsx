"use client";

import Image from "next/image";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Delivery from "@/components/home/Delivery";
import Hero from "@/components/ui/Hero";

export default function Company() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f4]">
      <Header />
      <Hero title={"Şirkət haqqında"} />

      <section className="container mx-auto px-4 max-w-5xl -mt-10 sm:-mt-12 relative z-20">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Kart 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-[#F36F20]">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">20+ il</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">təcrübə</p>
          </div>

          {/* Kart 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-[#F36F20]">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">80+</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">icarə maşın</p>
          </div>

          {/* Kart 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-[#F36F20]">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">98%</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">müştəri məmnuniyyəti</p>
          </div>

        </div>
      </section>

      
      <section
        className="relative mt-16 mb-20 py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/romb.png')",
        }}
      >

        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Şəkil */}
            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/cars/kia-forte.jpg"
                alt="AFN Transport"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-3 font-normal uppercase tracking-wider text-[#F36F20]">
                BİZ KİMİK?
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug">
                AFN Transport və Nəqliyyat şirkəti Azərbaycanda öz nəqliyyat bazasına görə ilk sıralarda yerləşən şirkətlərdən biridir.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                əlverişli xidmət səviyyəsi, sərfəli qiyməti və yüksək keyfiyyət müştərilər tərəfindən daima seçilməyimizə səbəb olur.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Şirkətimiz müxtəlif növ minik avtomobilləri ilə bərabər yükdaşıma avtomobilləri və xüsusi təyinatlı texnikaların icarəsini də həyata keçirir.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Geniş avtoparkımız sayəsində istənilən ehtiyacınıza uyğun nəqliyyat vasitəsini qısa müddət ərzində əldə etməyinizi təmin edirik.
              </p>
            </div>

          </div>

        
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

      
            <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
              <span className="text-3 font-normal uppercase tracking-wider text-[#F36F20]">
                NƏYƏ BİZİ SEÇMƏLİSİNİZ?
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug">
                Şirkətimiz 10 ildən artıqdır ki, fəaliyyət göstərir.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Fəaliyyətimiz müddətində müştərilərimizlə çox diqqətli münasibət qurmuş və ehtiyaclarına uyğun olaraq daima ən yaxşı xidməti göstərməyə çalışmışıq.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Nümunə olaraq Birleşmiş Gecə Trasf, Pasa Travel, Palmas, Cansen, Baksel, AOS, Caspian Events, Bakınyum Sanaye OJS. və s. şirkətlərimizlə daim uğurlu əməkdaşlıqlarımız olub.
              </p>
            </div>

        
            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-md order-1 lg:order-2">
              <Image
                src="/cars/aboutcar.jpg"
                alt="AFN Transport Features"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>

      </section>

      <Delivery />
      <Footer />

    </div>
  );
}