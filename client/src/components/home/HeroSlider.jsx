'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SLIDES } from '@/data/SlidesData';

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentSlide = SLIDES[currentIndex];

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    };

    const formatNumber = (num) => String(num).padStart(2, '0');

    return (
        <section className="relative w-full bg-transparent min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 w-full flex-1 grid grid-cols-1 md:grid-cols-12 items-center py-8 relative gap-6 z-10">

                <div className="md:col-span-4 flex flex-col justify-between h-full pt-6">
                    <div>
                        <h2 className="text-5xl lg:text-7xl font-normal tracking-tight leading-none text-orange-500 uppercase">
                            {currentSlide?.titleLine1}
                        </h2>
                        <h2 className="text-5xl lg:text-7xl font-normal tracking-tight leading-none text-slate-900 uppercase mt-1">
                            {currentSlide?.titleLine2}
                        </h2>
                    </div>

                    <div className="mt-12 md:mt-24">
                        <p className="text-3xl font-medium text-slate-900">
                            {currentSlide?.price}
                        </p>
                    </div>
                </div>

                <div className="md:col-span-5 relative flex justify-center items-center w-full min-h-50 md:min-h-[450px] -translate-x-6">
                    {currentSlide?.image && (
                        <Image
                            src={currentSlide.image}
                            alt={`${currentSlide.titleLine1 || ''} ${currentSlide.titleLine2 || ''}`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-contain transition-all duration-500 ease-in-out drop-shadow-xl scale-110"
                        />
                    )}
                </div>

                <div className="md:col-span-3 flex flex-col justify-between h-full pt-10">
                    <div className="flex flex-col text-left">
                        <p className="text-xl md:text-2xl text-slate-800 max-w-[280px] leading-snug">
                            <span className="font-bold">
                                {currentSlide?.subtitleBold}
                            </span>{" "}
                            <span className="font-normal whitespace-nowrap">
                                {currentSlide?.subtitleText}
                            </span>
                        </p>

                        <div className="flex justify-end mt-7">
                            <Link href="/login">
                                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base px-8 py-4 rounded-lg flex items-center gap-3 transition shadow-md hover:shadow-lg cursor-pointer">
                                    İndi icarə et
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full mt-12 md:mt-0 pt-4">
                        <div className="text-3xl font-medium text-slate-900 tracking-wider">
                            {formatNumber(currentIndex + 1)}
                            <span className="text-gray-400 font-medium text-xl">/{formatNumber(SLIDES.length)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className={`p-2 border rounded transition shadow-sm
                                 ${currentIndex === 0
                                        ? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed'
                                        : 'bg-white/80 border-gray-200 text-gray-600 hover:bg-white hover:border-orange-500 hover:text-orange-500 cursor-pointer'
                                    }
    `}
                                aria-label="Əvvəlki slayd"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === SLIDES.length - 1}
                                className={`p-2 border rounded transition shadow-sm
        ${currentIndex === SLIDES.length - 1
                                        ? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed'
                                        : 'bg-white/80 border-gray-200 text-gray-600 hover:bg-white hover:border-orange-500 hover:text-orange-500 cursor-pointer'
                                    }
    `}
                                aria-label="Növbəti slayd"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-5 border-t border-gray-300 bg-black">
                {SLIDES.map((slide, idx) => {
                    const isActive = idx === currentIndex;

                    return (
                        <button
                            key={slide.id}
                            onClick={() => setCurrentIndex(idx)}
                            className="group relative w-full overflow-hidden cursor-pointer"
                        >
                            <div className="relative w-full aspect-video overflow-hidden">
                                <Image
                                    src={slide.thumbImage}
                                    alt={slide.category}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />

                                <div
                                    className={`absolute inset-0 transition-opacity duration-300 ${isActive
                                        ? 'bg-black/5'
                                        : 'bg-black/40 group-hover:bg-black/10'
                                        }`}
                                />
                            </div>

                            <div
                                className={`h-12 w-full flex items-center justify-center text-4 font-semibold transition-colors ${isActive
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-black text-white'
                                    }`}
                            >
                                {slide.category}
                            </div>
                        </button>
                    );
                })}
            </div>

        </section>
    );
}