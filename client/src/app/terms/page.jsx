"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/ui/Hero";

const termsData = [
    {
        id: 1,
        title: "Sürücülük Hüququ və Yaş Həddi",
        content:
            "Avtomobil icarələmək üçün sürücünün minimum 24 yaşı və ən azı 2 illik aktiv sürücülük təcrübəsi olmalıdır. Xarici vətəndaşlar üçün pasport və beynəlxalq və ya milli sürücülük vəsiqəsi tələb olunur.",
    },
    {
        id: 2,
        title: "Depozit və Ödəniş Qaydaları",
        content:
            "İcarə haqqı avtomobil təhvil verilməzdən əvvəl tam ödənilməlidir. Mümkün radarlar və ya daxili zədələr üçün depozit məbləği alınır və nəqliyyat vasitəsi təhvil verildikdən sonra 3-7 iş günü ərzində tam qaytarılır.",
    },
    {
        id: 3,
        title: "Sığorta və Zərər Məsuliyyəti",
        content:
            "Bütün avtomobillərimiz İcbari və KASKO sığorta olunmuşdur. Sürücü yol hərəkəti qaydalarını pozmadığı, sərxoş vəziyyətdə olmadığı və Hadisə yerindən qaçmadığı halda bütün zərərlər sığorta şirkəti tərəfindən qarşılanır.",
    },
    {
        id: 4,
        title: "Yanacaq və Çatdırılma Şərtləri",
        content:
            "Avtomobil hansı yanacaq səviyyəsi ilə təhvil verilirsə, eyni səviyyədə də geri qaytarılmalıdır. Əlavə ödəniş qarşılığında avtomobilin Bakı şəhəri daxilində ünvanınıza və ya Hava Limanına çatdırılması mümkündür.",
    },
    {
        id: 5,
        title: "İstifadə Məhdudiyyətləri",
        content:
            "İcarəyə götürülmüş avtomobildən taksi fəaliyyəti, yarışlar və ya off-road sürmə üçün istifadə etmək qadağandır. Azərbaycan Respublikasının hüdudlarından kənara çıxış üçün xüsusi icazə tələb olunur.",
    },
];

export default function Terms() {
    const [openId, setOpenId] = useState(null);

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[#f4f4f4]">
            <Header />
            <Hero title={"İcarə Şərtləri"} />

            <section
                className="relative bg-cover bg-center bg-no-repeat p-15"
                style={{
                    backgroundImage: "url('/images/romb.png')",
                }}
            >

                <div className="container mx-auto px-4 max-w-4xl mt-10 space-y-4">
                    {termsData.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 border-l-4 border-l-[#F36F20] transition-all duration-300 overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(item.id)}
                                    className="w-full py-5 px-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                                >
                                    <span className="font-semibold text-gray-800 text-base sm:text-lg pr-4">
                                        {item.title}
                                    </span>

                                    <span
                                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#F36F20] font-bold text-xl transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45 bg-[#F36F20] text-white" : ""
                                            }`}
                                    >
                                        +
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                                            ? "grid-rows-[1fr] opacity-100 pb-5 px-6"
                                            : "grid-rows-[0fr] opacity-0 px-6"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <Footer />
        </div>
    );
}