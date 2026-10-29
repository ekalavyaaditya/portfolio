import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Home as HomeIcon, Mail, User } from "lucide-react";
import { gsap } from "gsap";
import config from "../config";
import notFoundBg from "../assets/not-found-bg.jpg";

const quickLinks = [
  { label: "HOME", hash: "", icon: HomeIcon },
  { label: "ABOUT ME", hash: "#about", icon: User },
  { label: "PROJECTS", hash: "#projects", icon: Briefcase },
  { label: "CONTACT", hash: "#contact", icon: Mail },
];

export default function NotFound() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const media = gsap.matchMedia();

    media.add(
      {
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        if (conditions.reduceMotion) return undefined;

        const isMobile = Boolean(conditions.isMobile);
        const bg = page.querySelector("[data-nf-bg]");
        const digits = page.querySelectorAll("[data-nf-digit]");
        const introTargets = page.querySelectorAll("[data-nf-intro]");

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (bg) {
          timeline.fromTo(
            bg,
            { autoAlpha: 0, scale: isMobile ? 1.03 : 1.06 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: isMobile ? 0.95 : 1.15,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
            },
            0
          );
        }

        if (digits.length) {
          timeline.fromTo(
            digits,
            {
              autoAlpha: 0,
              x: (index) => (index === 0 ? -24 : 24),
            },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
            },
            0.12
          );
        }

        if (introTargets.length) {
          timeline.fromTo(
            introTargets,
            { autoAlpha: 0, y: isMobile ? 16 : 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              clearProps: "opacity,visibility,transform",
            },
            0.2
          );
        }

        return undefined;
      },
      page
    );

    return () => media.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative min-h-[100dvh] overflow-hidden bg-black text-white selection:bg-white selection:text-black"
    >
      {/* Full-bleed uploaded noir background artwork */}
      <img
        data-nf-bg
        src={notFoundBg}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[50%_20%] sm:object-[50%_22%] lg:object-center"
      />

      {/* Atmospheric vignettes preserving center portrait & red glasses clarity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.14)_26%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.88)_84%,#000000_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_40%,transparent_20%,rgba(0,0,0,0.62)_85%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-noise opacity-70 mix-blend-screen"
      />

      {/* Flanking 4 and 4 framing the centered portrait as 404 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[33svh] z-20 flex w-full max-w-[82rem] -translate-x-1/2 -translate-y-1/2 select-none items-center justify-between px-4 sm:top-[38svh] sm:px-8 md:top-[42svh] md:px-14 lg:px-20"
      >
        <span
          data-nf-digit
          className="font-display text-[clamp(6.5rem,22vw,20rem)] font-black leading-none tracking-tighter text-white/[0.14] drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
        >
          4
        </span>
        <span
          data-nf-digit
          className="font-display text-[clamp(6.5rem,22vw,20rem)] font-black leading-none tracking-tighter text-white/[0.14] drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
        >
          4
        </span>
      </div>

      {/* Foreground layout */}
      <section className="relative z-30 mx-auto flex min-h-[100dvh] w-full max-w-screen-2xl flex-col items-center justify-between px-5 py-8 text-center sm:px-8 sm:py-10 md:px-12 lg:px-16">
        {/* Top status header */}
        <header data-nf-intro className="flex w-full flex-col items-center gap-3 pt-2 md:pt-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#dc2626] shadow-[0_0_10px_rgba(220,38,38,0.9)]" />
            <span className="font-mono text-[10px] font-semibold tracking-[0.34em] text-[#ef4444] sm:text-xs">
              ERROR 404
            </span>
          </div>

          <div className="flex w-full max-w-xl items-center justify-center gap-4 sm:gap-7">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-white/5" />
            <h1 className="font-mono text-xs font-medium tracking-[0.45em] text-white/80 [text-indent:0.45em] sm:text-sm sm:tracking-[0.55em] sm:[text-indent:0.55em]">
              PAGE NOT FOUND
            </h1>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/25 to-white/5" />
          </div>
        </header>

        {/* Bottom copy, primary CTA, and section shortcuts */}
        <div className="mt-auto flex w-full flex-col items-center pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:pb-6">
          <p
            data-nf-intro
            className="max-w-2xl font-mono text-xs leading-relaxed tracking-[0.26em] text-white/85 uppercase sm:text-sm sm:tracking-[0.34em] md:text-base"
          >
            The page you are looking for{" "}
            <span className="font-semibold text-[#ef4444]">doesn&apos;t exist</span>{" "}
            <span className="text-white/70">or has slipped into the shadows.</span>
          </p>

          <div data-nf-intro className="mt-6 sm:mt-8">
            <Link
              to={config.homePath}
              className="group inline-flex min-h-12 w-[min(24rem,calc(100vw-2.5rem))] items-center justify-center gap-4 border border-[#991b1b]/80 bg-black/60 px-7 py-3.5 font-mono text-xs font-semibold tracking-[0.28em] text-white shadow-[0_0_28px_rgba(185,28,28,0.16),inset_0_0_24px_rgba(185,28,28,0.1)] backdrop-blur-md transition-colors duration-300 hover:border-[#ef4444] hover:bg-[#1a0505]/85 sm:min-h-14 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4 flex-none text-[#ef4444] transition-transform duration-300 group-hover:-translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 sm:h-5 sm:w-5" />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          <nav
            data-nf-intro
            aria-label="404 quick navigation"
            className="mt-8 grid w-full max-w-2xl grid-cols-4 gap-2 border-t border-white/10 pt-5 text-white/50 sm:mt-9 sm:gap-6"
          >
            {quickLinks.map(({ label, hash, icon: Icon }) => (
              <Link
                key={label}
                to={hash ? { pathname: config.homePath, hash } : config.homePath}
                className="group flex min-w-0 flex-col items-center justify-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.2em] transition-colors duration-300 hover:text-white motion-reduce:transition-none sm:flex-row sm:gap-2.5 sm:text-xs sm:tracking-[0.24em]"
              >
                <Icon className="h-4 w-4 flex-none stroke-[1.5] text-white/60 transition-colors duration-300 group-hover:text-[#ef4444] motion-reduce:transition-none" />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
