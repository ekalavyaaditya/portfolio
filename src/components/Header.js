import logo from "../assets/logo.svg";
export default function Header() {
  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-24 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center border-b border-white/5">
      <div className="w-full max-w-screen-2xl px-8 md:px-16 flex items-center justify-between">

        {/* Left Logo */}
        <a href="/portfolio" className="hover:opacity-80 transition-opacity">
          <img
            src={logo}
            alt="AS Logo"
            className="h-12 w-auto"
          />
        </a>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center h-10 border-x border-white/10 px-12 gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[10px] font-medium tracking-[0.2em] text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Status */}
        <div className="flex-shrink-0 hidden sm:flex items-center gap-3">
          <span className="text-[10px] font-medium tracking-[0.2em] text-[#A1A1AA]">
            AVAILABLE FOR WORK
          </span>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-6 h-6 rounded-full bg-white/10 animate-[ping_3s_ease-out_infinite]"></div>
            <div className="absolute w-5 h-5 rounded-full bg-white/20 animate-[ping_3s_ease-out_infinite_0.5s]"></div>
            <div className="absolute w-4 h-4 rounded-full bg-white/30 animate-[ping_3s_ease-out_infinite_1s]"></div>
            <div className="relative w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]"></div>
          </div>

        </div>
      </div>
    </header>
  );
}
