import { ArrowRight } from 'lucide-react';
import heroBg from "../assets/herosectionbgimg.png";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-12">
            <div className="space-y-4">
              <p className="text-[#A1A1AA] font-mono text-xs tracking-[0.2em] uppercase">Hello, I'm</p>
              <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none text-white">
                ADITYA<span>'</span>S
              </h1>
            </div>
            <div className="space-y-6">
              <p className="text-white font-mono text-xs tracking-[0.3em] uppercase border-b border-white/20 pb-4 inline-block">Software Engineer</p>
              <p className="text-[#A1A1AA] font-mono text-lg max-w-xl leading-relaxed font-light">
                Building scalable web applications and exceptional digital experiences with modern technologies.
              </p>
            </div>
            <button className="group flex items-center gap-4 border border-white/20 px-8 py-4 text-xs font-mono tracking-[0.2em] hover:bg-white hover:text-black transition-all">
              VIEW MY WORK
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
