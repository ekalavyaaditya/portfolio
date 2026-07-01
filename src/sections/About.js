export default function About() {
  return (
    <section id="about" className="flex flex-col px-8 pt-5 pb-5 mt-3 md:px-16 max-w-screen-2xl mx-auto border-t border-white/5">
      {/* About Me */}
      <div className="lg:col-span-4 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-widest">ABOUT ME</h2>
        </div>
        <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
          <p>
            Results-driven Software Engineer with 5+ years of experience architecting and building performant, scalable, and secure web applications.
          </p>
          <p>
            Passionate about clean code, system design, and leveraging modern technologies to solve complex problems.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 pt-4">
          <div className="min-w-0 border-l border-white/35 pl-6">
            <span className="block text-2xl font-light leading-none text-gray-200">Bangalore, India</span>
            <span className="mt-4 block text-[10px] font-mono uppercase tracking-widest text-gray-400">LOCATION</span>
          </div>
          <div className="min-w-0 border-l border-white/35 pl-6">
            <span className="block text-2xl font-light leading-none text-gray-200">2+ Years</span>
            <span className="mt-4 block text-[10px] font-mono uppercase tracking-widest text-gray-400">EXPERIENCE</span>
          </div>
          <div className="min-w-0 border-l border-white/35 pl-6">
            <span className="block text-2xl font-light leading-none text-gray-200">Open to Work</span>
            <span className="mt-4 block text-[10px] font-mono uppercase tracking-widest text-gray-400">AVAILABILITY</span>
          </div>
          <div className="min-w-0 border-l border-white/35 pl-6">
            <span className="block break-words text-xl font-light leading-none text-gray-200 xl:text-2xl">ekalavyaaditya@gmail.com</span>
            <span className="mt-4 block text-[10px] font-mono uppercase tracking-widest text-gray-400">EMAIL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
