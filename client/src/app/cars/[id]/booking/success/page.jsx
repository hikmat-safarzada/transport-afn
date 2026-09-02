import React from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function SuccessSection() {
    return (
        <>
            <Header />
            <main className="bg-[#181818] min-h-[60vh] flex items-center justify-center py-20 px-4">
                <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-sm sm:max-w-md w-full text-center shadow-2xl flex flex-col items-center justify-center border border-gray-100">
                    <div className="mb-4">
                        <Image
                            src="/images/success.png"
                            alt="Təşəkkür edirik"
                            width={80}
                            height={80}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                        Təşəkkür edirik!
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        Sifarişiniz qeydə alındı.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default SuccessSection;