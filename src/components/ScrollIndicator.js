import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollIndicator() {
  const rootRef = useRef(null);
  const heroCueRef = useRef(null);
  const lineRef = useRef(null);
  const trackLineRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);
  const chevronsRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const heroCue = heroCueRef.current;
    const line = lineRef.current;
    const trackLine = trackLineRef.current;
    const fill = fillRef.current;
    const dot = dotRef.current;
    const chevrons = chevronsRef.current;

    if (!root || !heroCue || !line || !trackLine || !fill || !dot || !chevrons) {
      return undefined;
    }

    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        const reduceMotion = Boolean(conditions.reduceMotion);

        let baseHeight = 120;
        let expandedHeight = 560;
        const state = {
          expanded: 0,
          progress: 0,
        };

        const measureHeights = () => {
          baseHeight = line.clientHeight || 120;
          const fontSize = parseFloat(window.getComputedStyle(line).fontSize) || 16;
          expandedHeight = fontSize * 35;
        };

        measureHeights();

        gsap.set(trackLine, { scaleY: 1, transformOrigin: "center bottom" });
        gsap.set(fill, { scaleY: 0, y: 0, transformOrigin: "center top" });
        gsap.set(dot, { xPercent: -50, yPercent: -50, x: 0, y: 0 });

        const setTrackScaleY = gsap.quickSetter(trackLine, "scaleY");
        const setFillY = gsap.quickSetter(fill, "y", "px");
        const setFillScaleY = gsap.quickSetter(fill, "scaleY");
        const setDotY = gsap.quickSetter(dot, "y", "px");

        const renderIndicator = () => {
          const currentHeight =
            baseHeight + (expandedHeight - baseHeight) * state.expanded;
          const topOffset = baseHeight - currentHeight;

          setTrackScaleY(currentHeight / baseHeight);
          setFillY(topOffset);
          setFillScaleY((currentHeight * state.progress) / baseHeight);
          setDotY(topOffset + currentHeight * state.progress);
        };

        renderIndicator();

        if (reduceMotion) {
          gsap.set(root, { autoAlpha: 1, y: 0 });
        } else {
          gsap.fromTo(
            root,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              delay: 0.4,
              ease: "power3.out",
            }
          );
        }

        let chevronTimeline = null;
        if (!reduceMotion) {
          const chevronArrows = chevrons.querySelectorAll(".chevron-arrow");
          chevronTimeline = gsap.timeline({ repeat: -1 });

          chevronArrows.forEach((chevron, index) => {
            chevronTimeline
              .fromTo(
                chevron,
                { y: -6, opacity: 0 },
                {
                  y: 6,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.out",
                },
                index * 0.15
              )
              .to(
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
        }

        const transitionDuration = reduceMotion ? 0 : 0.3;

        ScrollTrigger.create({
          start: 50,
          onEnter: () => {
            gsap.to([heroCue, chevrons], {
              autoAlpha: 0,
              duration: transitionDuration,
              overwrite: "auto",
              onComplete: () => chevronTimeline?.pause(),
            });
            gsap.to(state, {
              expanded: 1,
              duration: transitionDuration,
              ease: "power2.out",
              overwrite: true,
              onUpdate: renderIndicator,
            });
          },
          onLeaveBack: () => {
            chevronTimeline?.play();
            gsap.to([heroCue, chevrons], {
              autoAlpha: 1,
              duration: transitionDuration,
              overwrite: "auto",
            });
            gsap.to(state, {
              expanded: 0,
              duration: transitionDuration,
              ease: "power2.out",
              overwrite: true,
              onUpdate: renderIndicator,
            });
          },
        });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          scrub: reduceMotion ? true : 0.35,
          onUpdate: (self) => {
            state.progress = self.progress;
            renderIndicator();
          },
        });

        const handleRefreshInit = () => {
          measureHeights();
          renderIndicator();
        };

        ScrollTrigger.addEventListener("refreshInit", handleRefreshInit);

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", handleRefreshInit);
        };
      },
      root
    );

    return () => media.revert();
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
        <span ref={trackLineRef} className="scroll-indicator__track-line" />
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
