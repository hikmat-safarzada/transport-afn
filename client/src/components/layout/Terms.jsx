"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const termsData = [
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id nunc felis ultrices vitae iaculis at eu. Tincidunt pellentesque lobortis enim morbi nulla tortor tristique in. Massa semper quis imperdiet cursus egestas. Nulla eget purus et phasellus vehicula feugiat. Quam dictumst diam id tincidunt est.",
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "İcarə şərtləri haqqında ətraflı məlumat burada yer alır. Sürücülük vəsiqəsi və yaş həddi tələbləri mövzusunda ətraflı izahat verilmişdir.",
    },
    {
        id: 3,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "Avtomobilin təhvil verilməsi və geri qaytarılması qaydaları, çən səviyyəsi və depozit qaydaları burada təsvir olunur.",
    },
    {
        id: 4,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        content:
            "Sığorta şərtləri və gözlənilməz hallarda (qəza, nasazlıq) tərəflərin öhdəlikləri barədə geniş məlumat.",
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

            <section className="w-full flex-grow pb-16">
                <div className="relative w-full h-60 sm:h-72 bg-black/90 flex flex-col items-center justify-center overflow-hidden">
                    <Image
                        src="/images/heroterm.jpg"
                        alt="Şərtlər Background"
                        fill
                        priority
                        className="object-cover object-center opacity-30"
                    />
                    <div className="relative z-10 flex flex-col items-center text-center px-4">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
                            Şərtlər
                        </h1>
                        <div className="w-12 h-1 bg-[#F36F20] rounded-full mt-3"></div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-4xl mt-10 space-y-4">
                    {termsData.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div
                                key={item.id}
                                className="bg-[#e8e8e8]/50 rounded-lg overflow-hidden border border-gray-200/60 shadow-sm"
                            >
                                <button
                                    onClick={() => toggleAccordion(item.id)}
                                    className={`w-full text-left p-5 flex items-center justify-between gap-4 border-l-4 transition-colors duration-200 ${isOpen
                                            ? "border-[#F36F20] bg-white"
                                            : "border-transparent bg-[#efefef] hover:bg-white"
                                        }`}
                                >
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base leading-snug">
                                        {item.title}
                                    </span>

                                    <span className="text-gray-500 font-bold text-xl shrink-0 select-none">
                                        {isOpen ? "−" : "+"}
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden border-l-4 border-[#F36F20] bg-white"
                                        >
                                            <div className="px-5 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
                                                {item.content}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </section>

            <Footer />
        </div>
    );
}