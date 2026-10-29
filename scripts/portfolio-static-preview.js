import { ArrowLeft, Briefcase, Home as HomeIcon, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "../assets/not-found-portrait.png";

const navItems = [
  { label: "HOME", to: "/", icon: HomeIcon },
  { label: "ABOUT ME", to: { pathname: "/", hash: "#about" }, icon: User },
  { label: "PROJECTS", to: { pathname: "/", hash: "#projects" }, icon: Briefcase },
  { label: "CONTACT", to: { pathname: "/", hash: "#contact" }, icon: Mail },
];

export default function NotFound() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#020202] text-white selection:bg-white selection:text-black">
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Portrait Image — Responsive for all screen sizes */}
      <img
        src={portrait}
        alt=""
        aria-hidden="true"
        className="absolute bottom-[-8svh] left-1/2 z-20 h-[88svh] max-h-[88rem] min-h-[34rem] w-auto -translate-x-1/2 select-none object-contain opacity-95 sm:bottom-[-10svh] sm:h-[94svh] md:h-[99svh] lg:bottom-[-12svh] lg:h-[104svh] xl:bottom-[-14svh] xl:h-[110svh] 2xl:max-h-[96rem]"
        style={{
          filter: "contrast(1.08) brightness(0.78) saturate(0.92)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.16),transparent_31%),linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.05)_34%,rgba(0,0,0,0.88)_92%)]" />
      <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_50%_47%,transparent_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-0 z-40 bg-noise opacity-70 mix-blend-screen" />

      {/* Main Content Section */}
      <section className="relative z-50 flex min-h-[100dvh] flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10 md:px-12 lg:px-16 xl:px-20">
        
        {/* Header */}
        <header className="flex w-full flex-col items-center gap-3 pt-2 sm:gap-4 md:pt-4 lg:pt-6">
          <p className="font-mono text-[clamp(0.78rem,2.1vw,1.05rem)] font-bold tracking-[0.68em] text-[#d82929] [text-indent:0.68em] md:text-[clamp(0.85rem,1.8vw,1.1rem)]">
            OOPS!
          </p>
          <div className="flex w-full max-w-[43rem] items-center justify-center gap-5 sm:gap-8 md:max-w-[50rem] lg:max-w-[56rem]">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/16 to-white/5" />
            <h1 className="font-mono text-[clamp(0.78rem,2.6vw,1.2rem)] font-normal tracking-[0.62em] text-white/72 [text-indent:0.62em] md:text-[clamp(0.9rem,2.2vw,1.35rem)]">
              PAGE NOT FOUND
            </h1>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/16 to-white/5" />
          </div>
        </header>

        {/* 404 Giant Text — Responsive scaling for all devices */}
        <div className="pointer-events-none absolute left-1/2 top-[31svh] z-10 flex w-[min(92vw,58rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-between px-0 sm:top-[35svh] md:top-[38svh] lg:top-[40svh] lg:w-[min(88vw,64rem)] xl:w-[min(86vw,70rem)]">
          {["4", "4"].map((digit, index) => (
            <span
              key={`${digit}-${index}`}
              className="font-serif text-[clamp(12rem,31vw,26rem)] font-black leading-none opacity-75 mix-blend-screen md:text-[clamp(14rem,28vw,28rem)] lg:text-[clamp(16rem,26vw,30rem)] xl:text-[clamp(18rem,24vw,32rem)]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.36)), url(${portrait})`,
                backgroundPosition: index === 0 ? "left center" : "right center",
                backgroundSize: "cover",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0 0 32px rgba(255,255,255,0.08)",
              }}
            >
              {digit}
            </span>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="mt-auto flex w-full flex-col items-center pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:pb-8 xl:pb-12">
          
          {/* Description */}
          <p className="max-w-[52rem] font-mono text-[clamp(0.72rem,2.2vw,1rem)] font-normal leading-[2.05] tracking-[0.44em] text-white/82 [text-indent:0.44em] md:text-[clamp(0.8rem,1.6vw,1.1rem)] lg:max-w-[60rem]">
            THE PAGE YOU ARE LOOKING FOR
            <br />
            <span className="text-[#e02a2a]">DOESN&apos;T EXIST</span>
            <span className="text-white/72"> OR HAS BEEN MOVED.</span>
          </p>

          {/* Back to Home Button */}
          <Link
            to="/"
            className="group mt-7 inline-flex min-h-14 w-[min(27rem,calc(100vw-3rem))] items-center justify-center gap-7 border border-[#8d2222]/80 bg-black/34 px-7 py-4 font-mono text-sm font-bold tracking-[0.34em] text-white/88 shadow-[0_0_28px_rgba(180,18,18,0.11),inset_0_0_30px_rgba(185,15,15,0.09)] backdrop-blur-sm transition-all duration-300 hover:border-[#df2f2f] hover:bg-[#170404]/70 hover:text-white [text-indent:0.34em] md:mt-8 md:min-h-16 md:w-[min(30rem,calc(100vw-4rem))] md:text-base lg:mt-10 lg:w-[min(32rem,28vw)]"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 flex-none text-[#df2f2f] transition-transform duration-300 group-hover:-translate-x-1 md:h-6 md:w-6" />
            <span>BACK TO HOME</span>
          </Link>

          {/* Navigation Links */}
          <nav
            className="mt-9 grid w-full max-w-[43rem] grid-cols-4 gap-2 text-white/42 sm:mt-10 sm:gap-7 md:max-w-[50rem] md:gap-8 lg:mt-12 lg:max-w-[56rem] lg:gap-10"
            aria-label="404 page navigation"
          >
            {navItems.map(({ label, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                className="group flex min-w-0 flex-col items-center justify-center gap-2 font-mono text-[0.56rem] font-bold tracking-[0.24em] transition-colors duration-300 hover:text-white sm:flex-row sm:gap-3 sm:text-[0.66rem] md:text-[0.72rem] lg:text-[0.78rem] lg:tracking-[0.28em]"
              >
                <Icon className="h-5 w-5 flex-none stroke-[1.35] opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:h-6 md:w-6" />
                <span className="truncate text-center leading-none">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}