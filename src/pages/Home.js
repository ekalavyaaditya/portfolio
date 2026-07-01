import Hero from "../sections/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import ScrollIndicator from "../components/ScrollIndicator";

export default function Home() {
  return (
    <main className="bg-[#000000] text-[#FFFFFF] min-h-screen selection:bg-white selection:text-black">
      <Header />
      <Hero />
      <ScrollIndicator />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
