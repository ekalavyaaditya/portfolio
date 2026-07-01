import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function ScrollIndicator() {
  const rootRef = useRef(null);
  const heroCueRef = useRef(null);
  const lineRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);
  const chevronsRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const heroCue = heroCueRef.current;
    const line = lineRef.current;
    const fill = fillRef.current;
    const dot = dotRef.current;
    const chevrons = chevronsRef.current;

    if (!root || !heroCue || !line || !fill || !dot || !chevrons) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(root, {
        autoAlpha: 0,
        y: 12,
      });
      gsap.set(fill, { scaleY: 0, transformOrigin: "center top" });
      gsap.set(dot, { y: 0 });

      // Page load fade-in animation
      gsap.to(root, {
        autoAlpha: 1,
        y: 0,
        duration: reduceMotion ? 0.01 : 1.2,
        delay: reduceMotion ? 0 : 0.4,
        ease: "power3.out",
      });

      // Chevron infinite loop animation
      const chevronArrows = chevrons.querySelectorAll(".chevron-arrow");
      const chevronTimeline = gsap.timeline({ repeat: -1 });

      chevronArrows.forEach((chevron, index) => {
        chevronTimeline.fromTo(
          chevron,
          { y: -6, opacity: 0 },
          {
            y: 6,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          index * 0.15
        ).to(
          chevron,
          {
            y: 12,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          index * 0.15 + 0.4
        );
      });

      // Hide text and chevrons on scroll
      ScrollTrigger.create({
        start: 50,
        onEnter: () => {
          gsap.to([heroCue, chevrons], { autoAlpha: 0, duration: 0.3, overwrite: "auto" });
        },
        onLeaveBack: () => {
          gsap.to([heroCue, chevrons], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
        }
      });

      // Scroll progress tracking
      ScrollTrigger.create({
        start: 0,
        end: "max",
        scrub: reduceMotion ? false : 0.35,
        onUpdate: (self) => {
          const progressValue = self.progress;
          gsap.set(fill, { scaleY: progressValue });
          // Ensure dot/knob stays centered on the track usingoffsetHeight
          gsap.set(dot, { y: line.offsetHeight * progressValue });
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="scroll-indicator"
      aria-hidden="true"
    >
      <div ref={heroCueRef} className="scroll-indicator__hero">
        <div className="scroll-indicator__text">
          <div className="scroll-indicator__word">
            <span>S</span><span>C</span><span>R</span><span>O</span><span>L</span><span>L</span>
          </div>
          <div className="scroll-indicator__word">
            <span>T</span><span>O</span>
          </div>
          <div className="scroll-indicator__word">
            <span>E</span><span>X</span><span>P</span><span>L</span><span>O</span><span>R</span><span>E</span>
          </div>
        </div>
      </div>

      <div ref={lineRef} className="scroll-indicator__track">
        <span ref={fillRef} className="scroll-indicator__fill" />
        <span ref={dotRef} className="scroll-indicator__dot" />
      </div>

      <div ref={chevronsRef} className="scroll-indicator__chevrons">
        <span className="chevron-arrow">⌄</span>
        <span className="chevron-arrow">⌄</span>
        <span className="chevron-arrow">⌄</span>
      </div>
    </div>
  );
}
