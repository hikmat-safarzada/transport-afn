


import About from "@/components/home/About";
import Advantages from "@/components/home/Advantages";
import ClassSection from "@/components/home/ClassSection";
import Delivery from "@/components/home/Delivery";
import FAQ from "@/components/home/FAQ";
import HeroSlider from "@/components/home/HeroSlider";
import Rezervation from "@/components/home/Rezervation";
import Sponsors from "@/components/layout/Sponsors";
import Stats from "@/components/home/Stats";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";


export default function HomePage() {
  return (
    <>
      <main
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
                    linear-gradient(
                        rgba(255, 255, 255, 0.4),
                        rgba(255, 255, 255, 0.4)
                    ),
                    url('/images/homeback.png')
                `,
        }}
      >
        <Header homePage />

        <HeroSlider />
      </main>
      <About />
      <Stats />
      <ClassSection />
      <Advantages />
      <Sponsors />
      <Rezervation />
      <FAQ title={"Ən çox verilən suallar"} homeFaq />
      <Delivery />
      <Footer />
    </>
  );
}