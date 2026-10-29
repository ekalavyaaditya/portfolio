import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingPage({ onComplete }) {
  const pageRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);
  const percentRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  useLayoutEffect(() => {
    const page = pageRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const dot = dotRef.current;
    const percent = percentRef.current;

    if (!page || !track || !fill || !dot || !percent) {
      return undefined;
    }

    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        let trackWidth = track.clientWidth || 0;
        let lastDisplay = -1;
        let resizeRaf = 0;
        const progressState = { value: 0 };

        gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(dot, { xPercent: -50, yPercent: -50, x: 0, y: 0 });

        const setFillScaleX = gsap.quickSetter(fill, "scaleX");
        const setDotX = gsap.quickSetter(dot, "x", "px");

        const renderProgress = () => {
          const ratio = progressState.value / 100;
          const display = Math.min(100, Math.round(progressState.value));

          setFillScaleX(ratio);
          setDotX(trackWidth * ratio);

          if (display !== lastDisplay) {
            lastDisplay = display;
            percent.textContent = `${display}%`;
          }
        };

        const handleResize = () => {
          if (resizeRaf) return;
          resizeRaf = window.requestAnimationFrame(() => {
            resizeRaf = 0;
            trackWidth = track.clientWidth || 0;
            renderProgress();
          });
        };

        window.addEventListener("resize", handleResize, { passive: true });

        if (conditions.reduceMotion) {
          progressState.value = 100;
          renderProgress();
          gsap.delayedCall(0.15, () => onCompleteRef.current?.());
        } else {
          renderProgress();
          gsap.to(progressState, {
            value: 100,
            duration: 3.2,
            ease: "none",
            onUpdate: renderProgress,
            onComplete: () => {
              gsap.delayedCall(0.45, () => onCompleteRef.current?.());
            },
          });
        }

        return () => {
          window.removeEventListener("resize", handleResize);
          if (resizeRaf) {
            window.cancelAnimationFrame(resizeRaf);
          }
        };
      },
      page
    );

    return () => media.revert();
  }, []);

  return (
    <main ref={pageRef} className="loading-page" aria-label="Loading portfolio">
      <div className="loading-vignette" />
      <section className="loading-content">
        <h1 className="loading-title" aria-live="polite">
          LOADING
        </h1>
        <div ref={trackRef} className="loading-track" aria-hidden="true">
          <div ref={fillRef} className="loading-fill" />
          <div ref={dotRef} className="loading-dot" />
        </div>
        <p ref={percentRef} className="loading-percent">
          0%
        </p>
        <p className="loading-wait">
          <span />
          PLEASE WAIT
          <span />
        </p>
      </section>
    </main>
  );
}
