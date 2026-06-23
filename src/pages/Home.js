import { motion, useScroll } from "framer-motion";
import Hero from "../sections/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-[#000000] text-[#FFFFFF] min-h-screen selection:bg-white selection:text-black">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      {/* Global Scroll Indicator */}
      <div className="fixed top-0 bottom-0 right-8 flex-col items-center py-24 z-50 pointer-events-none hidden md:flex">
        <div className="h-24 flex items-center justify-center mb-4">
          <span className="text-[10px] tracking-widest text-gray-500 rotate-90 origin-center">SCROLL</span>
        </div>
        <div className="w-px flex-1 bg-white/10 relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white origin-top"
            style={{ height: "100%", scaleY: scrollYProgress }}
          />
        </div>
      </div>
    </main>
  );
}
