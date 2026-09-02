"use client";

import { useState } from "react";


function FAQ({title, homeFaq=false}) {
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: "Avtomobil icarəsi üçün hansı sənədlər tələb olunur?",
            answer:
                "Avtomobil icarələmək üçün şəxsiyyət vəsiqəsi və ən azı 2 il sürücülük təcrübəsini təsdiq edən sürücülük vəsiqəsi (prava) tələb olunur.",
        },
        {
            question: "Depozit ödənişi necə qaytarılır?",
            answer:
                "Depozit məbləği avtomobil təhvil alındıqdan dərhal sonra (və ya radarlar yoxlanıldıqdan sonra) nağd və ya kart hesabınıza geri qaytarılır.",
        },
        {
            question: "Avtomobili başqa şəhərdə təhvil verə bilərəmmi?",
            answer:
                "Bəli, əvvəlcədən razılaşdırılmaq şərtilə avtomobili Azərbaycanın digər böyük şəhərlərində və ya hava limanında təhvil vermək mümkündür.",
        },
        {
            question: "Günlük yürüş (məsafə) məhdudiyyəti varmı?",
            answer:
                "Xeyr, təqdim etdiyimiz avtomobillərin əksəriyyətində günlük kilometraj məhdudiyyəti yoxdur. Ölkə daxilində sərbəst hərəkət edə bilərsiniz.",
        },
        {
            question: "Sığorta şərtləri necədir?",
            answer:
                "Bütün avtomobillərimiz KASKO və İcbari sığorta ilə təmin olunmuşdur. Qəza anında sığorta bütün xərcləri qarşılayır (sürücü qaydaları pozmadığı halda).",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                        {title}
                    </h2>
                    <div className={homeFaq ? "w-12 h-1 bg-[#F36F20] rounded-full mt-3 mx-auto" : "none"} />
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 border-l-4 border-l-[#F36F20] transition-all duration-300 overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full py-5 px-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                                >
                                    <span className="font-semibold text-gray-800 text-base sm:text-lg pr-4">
                                        {item.question}
                                    </span>

                                    <span
                                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#F36F20] font-bold text-xl transition-transform duration-300 shrink-0 ${
                                            isOpen ? "rotate-45 bg-[#F36F20] text-white" : ""
                                        }`}
                                    >
                                        +
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        isOpen
                                            ? "grid-rows-[1fr] opacity-100 pb-5 px-6"
                                            : "grid-rows-[0fr] opacity-0 px-6"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQ;