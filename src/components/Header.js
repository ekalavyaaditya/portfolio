import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import config from "../config";
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
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const backdropRef = useRef(null);
  const drawerRef = useRef(null);
  const drawerTimelineRef = useRef(null);
  const isScrolledRef = useRef(false);
  const isMenuOpenRef = useRef(false);
  const hasInteractedWithMenuRef = useRef(false);
  const wasMenuOpenRef = useRef(false);
  const restoreFocusRef = useRef(true);

  isMenuOpenRef.current = isMenuOpen;

  useEffect(() => {
    let scrollRaf = 0;

    const updateScrolled = () => {
      scrollRaf = 0;
      const nextScrolled = window.scrollY > 24;
      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    };

    const handleScroll = () => {
      if (!scrollRaf) {
        scrollRaf = window.requestAnimationFrame(updateScrolled);
      }
    };

    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
      }
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeDrawerOnDesktop = (event) => {
      if (event.matches) {
        restoreFocusRef.current = false;
        setIsMenuOpen(false);
      }
    };

    desktopQuery.addEventListener("change", closeDrawerOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeDrawerOnDesktop);
  }, []);

  useLayoutEffect(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return undefined;

    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        const prefersReducedMotion = Boolean(conditions.reduceMotion);
        const menuLinks = drawer.querySelectorAll("[data-mobile-nav-link]");
        const timeline = gsap.timeline({ paused: true });

        timeline
          .fromTo(
            backdrop,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: prefersReducedMotion ? 0.01 : 0.35,
              ease: "power2.out",
            },
            0
          )
          .fromTo(
            drawer,
            { autoAlpha: 0, xPercent: 100 },
            {
              autoAlpha: 1,
              xPercent: 0,
              duration: prefersReducedMotion ? 0.01 : 0.55,
              ease: "power3.out",
            },
            0
          )
          .fromTo(
            menuLinks,
            { autoAlpha: 0, x: 22 },
            {
              autoAlpha: 1,
              x: 0,
              duration: prefersReducedMotion ? 0.01 : 0.35,
              stagger: prefersReducedMotion ? 0 : 0.07,
              ease: "power2.out",
            },
            prefersReducedMotion ? 0 : 0.18
          );

        timeline.progress(isMenuOpenRef.current ? 1 : 0);
        drawerTimelineRef.current = timeline;

        return () => {
          drawerTimelineRef.current = null;
        };
      },
      drawer
    );

    return () => {
      media.revert();
      drawerTimelineRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (isMenuOpen) {
      hasInteractedWithMenuRef.current = true;
      drawerTimelineRef.current?.play();
    } else if (hasInteractedWithMenuRef.current) {
      drawerTimelineRef.current?.reverse();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      if (wasMenuOpenRef.current && restoreFocusRef.current) {
        menuButtonRef.current?.focus({ preventScroll: true });
      }
      wasMenuOpenRef.current = false;
      return undefined;
    }

    wasMenuOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreFocusRef.current = true;
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const drawer = drawerRef.current;
      const focusableElements = drawer?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!drawer.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const openMenu = () => {
    restoreFocusRef.current = true;
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    restoreFocusRef.current = true;
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[100] flex w-full items-center justify-center border-b transition-[padding,background-color,border-color,box-shadow] duration-500 ease-out motion-reduce:transition-none ${
          isScrolled
            ? "border-white/10 bg-black/65 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent py-6"
        }`}
      >
        <div className="flex w-full max-w-screen-2xl items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16">
          <Link
            to={config.homePath}
            onClick={() => {
              closeMenu();
              const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches;
              window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
            className="transition-opacity duration-300 hover:opacity-80 motion-reduce:transition-none"
            aria-label="Go to homepage"
          >
            <img
              src={logo}
              alt="AS Logo"
              className={`w-auto transition-[height] duration-500 motion-reduce:transition-none ${
                isScrolled ? "h-9 md:h-10" : "h-10 md:h-12"
              }`}
            />
          </Link>

          <nav
            className="hidden h-10 items-center gap-6 border-x border-white/10 px-7 md:flex lg:gap-10 lg:px-12"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[10px] font-medium tracking-[0.2em] text-[#A1A1AA] transition-colors duration-300 hover:text-white motion-reduce:transition-none"
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
              <div className="absolute h-6 w-6 animate-[ping_3s_ease-out_infinite] rounded-full bg-white/10 motion-reduce:animate-none" />
              <div className="absolute h-5 w-5 animate-[ping_3s_ease-out_infinite_0.5s] rounded-full bg-white/20 motion-reduce:animate-none" />
              <div className="absolute h-4 w-4 animate-[ping_3s_ease-out_infinite_1s] rounded-full bg-white/30 motion-reduce:animate-none" />
              <div className="relative h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            </div>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMenu}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/10 motion-reduce:transition-none md:hidden"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
          </button>
        </div>
      </header>

      <button
        ref={backdropRef}
        type="button"
        onClick={closeMenu}
        className="fixed inset-0 z-[105] bg-black/70 backdrop-blur-sm md:hidden"
        aria-hidden="true"
        tabIndex={-1}
        inert={!isMenuOpen}
      />

      <aside
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal={isMenuOpen ? "true" : undefined}
        aria-labelledby="mobile-navigation-title"
        className="fixed right-0 top-0 z-[110] flex h-dvh w-[min(86vw,360px)] flex-col border-l border-white/10 bg-[#080808]/95 shadow-[-24px_0_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:hidden"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span
            id="mobile-navigation-title"
            className="text-[10px] font-medium tracking-[0.3em] text-white/50"
          >
            NAVIGATION
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition-[transform,background-color,border-color] duration-300 hover:rotate-90 hover:border-white/30 hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:rotate-0"
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
              data-mobile-nav-link
              className="group flex items-center justify-between border-b border-white/10 py-5 text-sm font-medium tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-white motion-reduce:transition-none"
            >
              <span>{item.label}</span>
              <span className="font-mono text-[10px] text-white/25 transition-colors duration-300 group-hover:text-white/60 motion-reduce:transition-none">
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
