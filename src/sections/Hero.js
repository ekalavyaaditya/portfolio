import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import heroBg from "../assets/herosectionbgimg.png";
import mobileHeroBg from "../assets/moblie_view_point.png";

export default function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const media = gsap.matchMedia();

    media.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktopBg: "(min-width: 1024px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        if (conditions.reduceMotion) return undefined;

        const isMobile = Boolean(conditions.isMobile);
        const visualSelector = conditions.isDesktopBg
          ? '[data-hero-visual="desktop"]'
          : '[data-hero-visual="mobile"]';
        const introTargets = hero.querySelectorAll("[data-hero-intro]");
        const activeVisual = hero.querySelector(visualSelector);

        const timeline = gsap.timeline();

        if (introTargets.length) {
          timeline.fromTo(
            introTargets,
            { autoAlpha: 0, y: isMobile ? 16 : 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: isMobile ? 0.65 : 0.75,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
            }
          );
        }

        if (activeVisual) {
          timeline.fromTo(
            activeVisual,
            { autoAlpha: 0, scale: isMobile ? 1.025 : 1.05 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: isMobile ? 0.9 : 1.05,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
            },
            0.08
          );
        }

        return undefined;
      },
      hero
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div
        data-hero-visual="mobile"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{ backgroundImage: `url(${mobileHeroBg})` }}
        aria-hidden="true"
      />
      <div
        data-hero-visual="desktop"
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat lg:block"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mt-auto mb-12 mx-auto px-6 md:px-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-12">
            <div className="space-y-4">
              <p
                data-hero-intro
                className="text-[#A1A1AA] font-mono text-xs tracking-[0.2em] uppercase"
              >
                Hello, I'm
              </p>
              <h1
                data-hero-intro
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black tracking-tighter leading-none text-white"
              >
                ADITYA<span>'</span>S
              </h1>
            </div>
            <div className="space-y-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 lg:bg-transparent lg:backdrop-blur-none lg:border-0 lg:rounded-none lg:p-0">
              {/* <div className="space-y-6"> */}
              <p
                data-hero-intro
                className="text-white font-mono text-xs tracking-[0.3em] uppercase border-b border-white/20 pb-4 inline-block"
              >
                Software Engineer
              </p>
              <p
                data-hero-intro
                className="text-[#A1A1AA] font-mono text-lg max-w-xl leading-relaxed font-light"
              >
                Building scalable web applications and exceptional digital
                experiences with modern technologies.
              </p>
            </div>
            <a
              data-hero-intro
              href="#projects"
              className="group flex w-fit items-center gap-4 border border-white/20 px-8 py-4 text-xs font-mono tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 motion-reduce:transition-none"
            >
              VIEW MY WORK
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
