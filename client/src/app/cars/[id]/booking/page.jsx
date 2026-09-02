"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";




const getLocalDateString = (d = new Date()) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

function BookingContent() {
    const router = useRouter();
    const params = useParams();
    const carId = params?.id;
    const searchParams = useSearchParams();
    const initialDays = searchParams.get("days");

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        marka: "",
        model: "",
        city: "Bakı",
        address: "",
        startDate: "",
        endDate: "",
        fullName: "",
        phone: "",
        email: "",
        notes: "",
        childSeat: false,
        personalDriver: false,
        paymentType: "online",
    });

    useEffect(() => {
        if (!formData.startDate) {
            const start = new Date();
            start.setDate(start.getDate() + 1);

            const daysToAdd = initialDays ? Number(initialDays) : 1;
            const end = new Date(start);
            end.setDate(start.getDate() + daysToAdd);

            setFormData((prev) => ({
                ...prev,
                startDate: getLocalDateString(start),
                endDate: getLocalDateString(end),
            }));
        }
    }, [initialDays, formData.startDate]);

    useEffect(() => {
        async function fetchCarDetails() {
            if (!carId) return;
            try {
                const res = await fetch(`/api/cars/${carId}`);
                const data = await res.json();
                const carData = data.car || data;

                if (res.ok && carData) {
                    setCar(carData);
                    setFormData((prev) => ({
                        ...prev,
                        marka: carData.brand || "",
                        model: carData.model || "",
                    }));
                } else {
                    setError("Avtomobil məlumatları tapılmadı");
                }
            } catch (err) {
                setError("Məlumat yüklənərkən xəta baş verdi");
            } finally {
                setLoading(false);
            }
        }

        fetchCarDetails();
    }, [carId]);

    const { days, carPrice, childSeatPrice, driverPrice, totalPrice } = useMemo(() => {
        const pricePerDay = car?.pricePerDay || 0;
        if (!formData.startDate || !formData.endDate) {
            return { days: 0, carPrice: 0, childSeatPrice: 0, driverPrice: 0, totalPrice: 0 };
        }

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        if (start >= end) {
            return { days: 0, carPrice: 0, childSeatPrice: 0, driverPrice: 0, totalPrice: 0 };
        }

        const calculatedDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const getDiscountRate = (d) => {
            if (d >= 15) return 0.3;
            if (d >= 10) return 0.2;
            if (d >= 5) return 0.1;
            return 0;
        };

        const discountRate = getDiscountRate(calculatedDays);
        const discountedPricePerDay = Math.round(pricePerDay * (1 - discountRate));

        const cPrice = calculatedDays * discountedPricePerDay;
        const csPrice = formData.childSeat ? 10 * calculatedDays : 0;
        const dPrice = formData.personalDriver ? 30 * calculatedDays : 0;

        return {
            days: calculatedDays,
            carPrice: cPrice,
            childSeatPrice: csPrice,
            driverPrice: dPrice,
            totalPrice: cPrice + csPrice + dPrice,
        };
    }, [formData.startDate, formData.endDate, formData.childSeat, formData.personalDriver, car]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch(`/api/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    car: carId,
                    ...formData,
                    days,
                    carPrice,
                    childSeatPrice,
                    driverPrice,
                    totalPrice,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Xəta baş verdi");

            router.push(`/cars/${carId}/booking/success`);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#181818] min-h-screen flex items-center justify-center text-white text-xs">
                Məlumatlar yüklənir...
            </div>
        );
    }

    const inputStyle =
        "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-700 bg-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#F36F20] focus:ring-1 focus:ring-[#F36F20]";

    return (
        <>
            <Header />
            <div className="bg-[#181818] min-h-screen py-10 px-4 text-white font-sans">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition mb-6"
                    >
                        <ArrowLeft size={14} /> Geri qayıt
                    </button>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                            Onlayn avtomobil icarəsi
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-400">
                            Bir neçə kliklə Bakıda asan və sadə onlayn icarə avtomobil sifarişi
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-10 text-gray-800 shadow-2xl">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="marka"
                                    readOnly
                                    value={formData.marka}
                                    placeholder="Marka"
                                    className={`${inputStyle} bg-gray-50 cursor-not-allowed`}
                                />
                                <input
                                    type="text"
                                    name="model"
                                    readOnly
                                    value={formData.model}
                                    placeholder="Model"
                                    className={`${inputStyle} bg-gray-50 cursor-not-allowed`}
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900">Çatdırılma</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={inputStyle}
                                    >
                                        <option value="Bakı">Bakı</option>
                                        <option value="Sumqayıt">Sumqayıt</option>
                                        <option value="Gəncə">Gəncə</option>
                                    </select>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Ünvan"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={inputStyle}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="date"
                                        name="startDate"
                                        required
                                        min={getLocalDateString()}
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className={inputStyle}
                                    />

                                    <input
                                        type="date"
                                        name="endDate"
                                        required
                                        min={formData.startDate || getLocalDateString()}
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className={inputStyle}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="*Adınız və Soyadınız"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className={inputStyle}
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="*Əlaqə nömrəsi"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={inputStyle}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="*E-mail"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={inputStyle}
                                        />
                                    </div>

                                    <div>
                                        <textarea
                                            name="notes"
                                            placeholder="Əlavə qeydləriniz"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            className={`${inputStyle} resize-none min-h-[125px]`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <h3 className="text-sm font-bold text-gray-900">Əlavə xidmətlər</h3>
                                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-700">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            name="childSeat"
                                            checked={formData.childSeat}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-[#F36F20] rounded"
                                        />
                                        <span>Uşaq oturacağı (10 AZN/gün)</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            name="personalDriver"
                                            checked={formData.personalDriver}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-[#F36F20] rounded"
                                        />
                                        <span>Şəxsi sürücü (30 AZN/gün)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <h3 className="text-sm font-bold text-gray-900">Ödəniş növünü seçin</h3>
                                <div className="space-y-2 text-xs text-gray-700">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="radio"
                                            name="paymentType"
                                            value="online"
                                            checked={formData.paymentType === "online"}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-[#F36F20]"
                                        />
                                        <span>Onlayn ödəniş (Visa, Master Card)</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="radio"
                                            name="paymentType"
                                            value="cash"
                                            checked={formData.paymentType === "cash"}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-[#F36F20]"
                                        />
                                        <span>Nağd ödəniş</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="radio"
                                            name="paymentType"
                                            value="pos"
                                            checked={formData.paymentType === "pos"}
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-[#F36F20]"
                                        />
                                        <span>POS terminal (Visa, Master card)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                                <div className="flex items-center justify-between text-gray-600">
                                    <span>Avtomobilin icarə qiyməti ({days} gün)</span>
                                    <div className="flex-1 border-b border-dotted border-gray-300 mx-2"></div>
                                    <span className="font-semibold text-gray-800">{carPrice} AZN</span>
                                </div>

                                {formData.childSeat && (
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span>Uşaq oturacağı</span>
                                        <div className="flex-1 border-b border-dotted border-gray-300 mx-2"></div>
                                        <span className="font-semibold text-gray-800">{childSeatPrice} AZN</span>
                                    </div>
                                )}

                                {formData.personalDriver && (
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span>Şəxsi sürücü</span>
                                        <div className="flex-1 border-b border-dotted border-gray-300 mx-2"></div>
                                        <span className="font-semibold text-gray-800">{driverPrice} AZN</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-2 text-xs font-bold">
                                    <span className="text-gray-900 tracking-wider">CƏMİ QİYMƏT</span>
                                    <div className="flex-1 border-b border-dotted border-gray-300 mx-2"></div>
                                    <span className="text-[#F36F20]">
                                        {carPrice} {formData.childSeat ? `+ ${childSeatPrice}` : ""}{" "}
                                        {formData.personalDriver ? `+ ${driverPrice}` : ""} = {totalPrice} AZN
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || days === 0}
                                className="w-full bg-[#F36F20] hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-200 text-xs shadow-md disabled:opacity-50"
                            >
                                {submitting ? "Göndərilir..." : "Ödənişə davam et"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default function BookingPage() {
    return (
        <Suspense
            fallback={
                <div className="bg-[#181818] min-h-screen flex items-center justify-center text-white text-xs">
                    Məlumatlar yüklənir...
                </div>
            }
        >
            <BookingContent />
        </Suspense>
    );
}