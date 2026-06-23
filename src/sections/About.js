export default function About() {
  return (
    <section id="about" className="flex flex-col px-8 pt-5 pb-5 md:px-16 max-w-screen-2xl mx-auto border-t border-white/5">
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
        <div className="space-y-4 pt-4">
          <div className="flex justify-between py-3 border-b border-white/10 text-sm">
            <span className="text-gray-500">LOCATION</span>
            <span className="text-gray-300">Bangalore, India</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/10 text-sm">
            <span className="text-gray-500">EXPERIENCE</span>
            <span className="text-gray-300">2+ Years</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/10 text-sm">
            <span className="text-gray-500">AVAILABILITY</span>
            <span className="text-gray-300">Open to Work</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">EMAIL</span>
            <span className="text-gray-300">ekalavyaaditya@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
