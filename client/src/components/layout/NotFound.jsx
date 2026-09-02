import Header from "@/components/layout/Header"
import Footer from "./Footer"
import Link from "next/link"



function NotFound() {
    return (
        <>
            <Header />
            <div className="bg-white overflow-hidden min-h-screen flex justify-center items-center">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-20 relative">

                    <div className="z-10">
                        <h1 className="text-8xl font-bold text-gray-800">404</h1>
                        <div className="bg-orange-500 h-3 w-full mt-2 mb-6"></div>
                        <p className="text-xl text-gray-700 mb-6">Axtardığınız səhifə tapılmadı</p>
                        <Link href={"/"}>
                            <button className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition cursor-pointer">
                                Əsas səhifəyə qayıt
                            </button>
                        </Link>
                    </div>
                    <div className="relative w-1/2 h-96 flex items-center justify-end">

                        <div className="absolute right-0 bg-orange-500 w-2/3 h-full z-0"></div>
                        <img
                            src="/images/car-404.png"
                            alt="Car"
                            className="relative z-10 w-full object-contain"
                        />
                    </div>

                </div>
            </div>
            <Footer />
        </>

    )
}

export default NotFound