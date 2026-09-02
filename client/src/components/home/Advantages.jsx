
import Image from "next/image";
import { Car, ShieldCheck, HandCoins, UserCheck, Headset, MapPin } from "lucide-react";
export default function Advantages() {
    return (
        <section className="relative py-16 overflow-hidden text-gray-800 before:absolute before:inset-0 before:bg-[url('/thumbs/adv.jpg')] before:bg-cover before:bg-center before:opacity-30 before:-z-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                        AFN Transport-dan icarə maşın götürməyin üstünlükləri
                    </h2>
                    <div className="w-12 h-1 bg-[#F36F20] mx-auto mt-3"></div>
                </div>

                <div className="relative w-full min-h-[500px] flex items-center justify-center">

                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block"
                        viewBox="0 0 1000 500"
                        fill="none"
                    >
                        <path
                            d="M 230 110 Q 250 160 310 180"
                            stroke="#F36F20"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />

                        <path
                            d="M 450 85 Q 445 125 470 150"
                            stroke="#F36F20"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />

                        <path
                            d="M 710 120 Q 690 155 660 170"
                            stroke="#F36F20"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />
                        <path
                            d="M 230 380 Q 280 370 320 350"
                            stroke="#F36F20"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />

                        <path
                            d="M 460 410 Q 510 380 480 360"
                            stroke="#F36F20"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />

                        <path
                            d="M 740 380 C 710 330 680 370 650 340"
                            stroke="#F36F20"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />
                    </svg>

                    <div className="relative z-10 w-full max-w-[680px] h-[280px] sm:h-[360px]">
                        <Image
                            src="/images/caradv.png"
                            alt="AFN Transport Maşın"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="lg:absolute lg:top-[10%] lg:left-[8%] z-20 flex items-center gap-3 bg-transparent max-w-[240px] mb-4 lg:mb-0">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[#F36F20] text-xl shrink-0">
                            <Car/>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 leading-tight">
                            Dayanacağımızda 90 -dan çox icarə maşınlar mövcuddur
                        </p>
                    </div>

                    <div className="lg:absolute lg:top-[5%] lg:left-[40%] z-20 flex items-center gap-3 bg-transparent max-w-[220px] mb-4 lg:mb-0">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[#F36F20] text-xl shrink-0">
                            <ShieldCheck/>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 leading-tight">
                            Bütün avtomobillərimiz tam sığortalıdır
                        </p>
                    </div>

                    <div className="lg:absolute lg:top-[12%] lg:right-[8%] z-20 flex items-center gap-3 bg-transparent max-w-[230px] mb-4 lg:mb-0">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[#F36F20] text-xl shrink-0">
                            <HandCoins/>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 leading-tight">
                            Avtomobil kirayələmək üçün münasib qiymətlər
                        </p>
                    </div>

                    <div className="lg:absolute lg:bottom-[10%] lg:left-[10%] z-20 flex items-center gap-3 bg-transparent max-w-[220px] mb-4 lg:mb-0">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[#F36F20] text-xl shrink-0">
                            <UserCheck/>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 leading-tight">
                            Təcrübəli və qayğıkeş heyət
                        </p>
                    </div>

                    <div className="lg:absolute lg:bottom-[5%] lg:left-[41%] z-20 flex items-center gap-3 bg-transparent max-w-[210px] mb-4 lg:mb-0">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[#F36F20] text-xl shrink-0">
                            <Headset/>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 leading-tight">
                            24/7 xidmət mövcuddur
                        </p>
                    </div>

            
                    <div className="lg:absolute lg:bottom-[10%] lg:right-[10%] z-20 flex items-center gap-3 bg-transparent max-w-[220px]">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[#F36F20] text-xl shrink-0">
                            <MapPin/>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 leading-tight">
                            Kirayə maşını olduğunuz yerə çatdırırıq
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}