import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[100] flex w-full items-center justify-center border-b transition-all duration-500 ease-out ${
          isScrolled
            ? "border-white/10 bg-black/65 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent py-6"
        }`}
      >
        <div className="flex w-full max-w-screen-2xl items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16">
          <a
            href="/"
            onClick={closeMenu}
            className="transition-opacity duration-300 hover:opacity-80"
            aria-label="Go to homepage"
          >
            <img
              src={logo}
              alt="AS Logo"
              className={`w-auto transition-all duration-500 ${
                isScrolled ? "h-9 md:h-10" : "h-10 md:h-12"
              }`}
            />
          </a>

          <nav
            className="hidden h-10 items-center gap-6 border-x border-white/10 px-7 md:flex lg:gap-10 lg:px-12"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[10px] font-medium tracking-[0.2em] text-[#A1A1AA] transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 items-center gap-3 md:flex">
            <span className="hidden text-[10px] font-medium tracking-[0.2em] text-[#A1A1AA] lg:block">
              AVAILABLE FOR WORK
            </span>

            <div className="relative flex items-center justify-center" aria-hidden="true">
              <div className="absolute h-6 w-6 animate-[ping_3s_ease-out_infinite] rounded-full bg-white/10" />
              <div className="absolute h-5 w-5 animate-[ping_3s_ease-out_infinite_0.5s] rounded-full bg-white/20" />
              <div className="absolute h-4 w-4 animate-[ping_3s_ease-out_infinite_1s] rounded-full bg-white/30" />
              <div className="relative h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </header>

      <button
        type="button"
        onClick={closeMenu}
        className={`fixed inset-0 z-[105] bg-black/70 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Close navigation menu"
        tabIndex={isMenuOpen ? 0 : -1}
      />

      <aside
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-[110] flex h-dvh w-[min(86vw,360px)] flex-col border-l border-white/10 bg-[#080808]/95 shadow-[-24px_0_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-transform duration-500 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="text-[10px] font-medium tracking-[0.3em] text-white/50">NAVIGATION</span>
          <button
            type="button"
            onClick={closeMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition-all duration-300 hover:rotate-90 hover:border-white/30 hover:bg-white/10"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center px-8" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              className="group flex items-center justify-between border-b border-white/10 py-5 text-sm font-medium tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-white"
            >
              <span>{item.label}</span>
              <span className="font-mono text-[10px] text-white/25 transition-colors duration-300 group-hover:text-white/60">
                0{index + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 border-t border-white/10 px-8 py-7">
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          <span className="text-[9px] font-medium tracking-[0.22em] text-white/45">
            AVAILABLE FOR WORK
          </span>
        </div>
      </aside>
    </>
  );
}
